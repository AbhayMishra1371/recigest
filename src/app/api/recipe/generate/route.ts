import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { generateRecipeWithGemini } from "@/lib/generate";
import { rateLimit } from "@/lib/rateLimit";
import redisClient from "@/lib/redis";

export async function POST(req: Request) {
  try {
    // Protect API with JWT
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Rate Limiting (Limit by User ID or IP)
    // Using User ID since we have auth
    const limitResult = await rateLimit(`recipe_gen:${user.userId || 'anonymous'}`);
    if (!limitResult.success) {
       return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Get food item from frontend
    const { food } = await req.json();

    if (!food || food.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Food item is required" },
        { status: 400 }
      );
    }

    // Redis Caching
    const cacheKey = `recipe:${food.trim().toLowerCase()}`;
    const cachedRecipe = await redisClient.get(cacheKey);

    if (cachedRecipe) {
        console.log(`Cache Hit for: ${food}`);
        return NextResponse.json({
            success: true,
            food: food,
            recipe: cachedRecipe, // Cached value is likely the string recipe
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

    // Store in Redis (Expire in 1 hour similar to standard caching)
    if (result.recipe) {
        await redisClient.set(cacheKey, result.recipe, {
            EX: 3600 
        });
    }

    return NextResponse.json({
      success: true,
      food: result.food,
      recipe: result.recipe,
      isCached: false
    });

  } catch (error) {
    console.error("Recipe Generate API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
