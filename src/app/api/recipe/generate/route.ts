import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { generateRecipeWithGemini } from "@/lib/generate";

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

    // Get food item from frontend
    const { food } = await req.json();

    if (!food || food.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Food item is required" },
        { status: 400 }
      );
    }

  
    const result = await generateRecipeWithGemini(food);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      food: result.food,
      recipe: result.recipe,
    });

  } catch (error) {
    console.error("Recipe Generate API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
