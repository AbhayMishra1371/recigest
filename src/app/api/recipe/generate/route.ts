import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { generateRecipeWithGemini } from "@/lib/generate";
import { ratelimit } from "@/lib/rateLimit";
import redis from "@/lib/redis";
import { recipeGenerateSchema } from "@/lib/validations/recipe";

export async function POST(req: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Rate Limiting (Upstash)
    // defined in lib/rateLimit.ts with 10 requests per 60 seconds
    const identifier = `recipe_gen:${user.userId || 'anonymous'}`;
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
       return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = recipeGenerateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: validation.error.issues[0].message 
        },
        { status: 400 }
      );
    }

    const { food } = validation.data;

    // Redis Caching (Upstash)
    // bumped version to recipe_json to invalidate old text-only cache
    const cacheKey = `recipe_json:${food.trim().toLowerCase()}`;
    const cachedRecipe = await redis.get<string>(cacheKey);

    if (cachedRecipe) {
        console.log(`Cache Hit for: ${food}`);
        return NextResponse.json({
            success: true,
            food: food,
            recipe: cachedRecipe,
            isCached: true
        });
    }

    console.log(`Cache Miss for: ${food}`);
    const result = await generateRecipeWithGemini(food);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // Store in Redis (Upstash)
    if (result.recipe) {
        // Upstash redis.set supports options as third arg, less than 24h cache is safer for testing
        await redis.set(cacheKey, result.recipe, { ex: 3600 * 24 });

        // Save to user history
        const historyKey = `history:${user.userId}`;
        const foodItem = food.trim();
        
        // Deduplicate and update history

        
        // Generate a deterministic image URL for history
        const deterministicSeed = Array.from(foodItem).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const imageUrl = `https://image.pollinations.ai/prompt/delicious ${foodItem} dish professional food photography cinematic lighting?width=1280&height=720&nologo=true&seed=${deterministicSeed}&model=flux`;

        const historyEntry = JSON.stringify({
            food: foodItem,
            image: imageUrl
        });
        
        // Fetch existing history to remove duplicates (handles both old string format and new JSON format)
        const existingHistory = await redis.lrange(historyKey, 0, -1);
        for (const entry of existingHistory) {
            let foodInHistory: string | null = null;
            
            if (typeof entry === 'string') {
                try {
                    const parsed = JSON.parse(entry);
                    foodInHistory = typeof parsed === 'object' && parsed !== null ? parsed.food : entry;
                } catch {
                    foodInHistory = entry;
                }
            } else if (typeof entry === 'object' && entry !== null) {
                foodInHistory = (entry as any).food || null;
            }

            if (foodInHistory && foodInHistory.toLowerCase() === foodItem.toLowerCase()) {
                await redis.lrem(historyKey, 0, entry);
            }
        }

        await redis.lpush(historyKey, historyEntry);
        await redis.ltrim(historyKey, 0, 4); // Keep only 5 most recent unique items
    }

    return NextResponse.json({
      success: true,
      food: result.food,
      recipe: result.recipe,
      isCached: false
    });

  } catch (error: any) {
    console.error("Recipe Generate API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
