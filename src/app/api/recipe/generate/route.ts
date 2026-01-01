import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { generateRecipeWithGemini } from "@/lib/generate";
import { ratelimit } from "@/lib/rateLimit";
import redis from "@/lib/redis";
import { recipeGenerateSchema } from "@/lib/validations/recipe";
import { generateImageUrl } from "@/lib/image";

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

    if (!result.success || !result.recipe) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to generate recipe" },
        { status: 500 }
      );
    }

    // Try to extract visual_prompt for history
    let visualPrompt = "";
    try {
        const parsed = JSON.parse(result.recipe.replace(/```json/g, "").replace(/```/g, "").trim());
        visualPrompt = parsed.visual_prompt || "";
    } catch (e) {
        console.warn("Failed to parse recipe for visual_prompt", e);
    }

    // Store in Redis (Upstash)
    // Upstash redis.set supports options as third arg, less than 24h cache is safer for testing
    await redis.set(cacheKey, result.recipe, { ex: 3600 * 24 });

    // Save to user history
    const historyKey = `history:${user.userId}`;
    const foodItem = food.trim();
    
    // Generate an optimized image URL for history using the visual prompt if available
    const imageUrl = generateImageUrl(foodItem, visualPrompt);

    const historyEntry = JSON.stringify({
        food: foodItem,
        image: imageUrl
    });
    
    // Fetch existing history to remove duplicates
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
