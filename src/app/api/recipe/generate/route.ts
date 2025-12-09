import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getUserFromToken } from "@/lib/auth";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    // ✅ JWT check
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { food } = await req.json();

    if (!food || food.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Food name is required" },
        { status: 400 }
      );
    }

    const prompt = `
Create a detailed recipe for "${food}".

Include:
- Ingredients list
- Step-by-step cooking instructions
- Cooking time
- Serving size
- Health tips

Format it clearly with headings.
    `;

    // ✅ CORRECT OpenAI Call (No fetch, No .json, No choices bug)
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // ✅ Stable & cheap
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const recipe = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      food,
      recipe,
    });

  } catch (error: any) {
    console.error("Recipe API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Recipe generation failed",
      },
      { status: 500 }
    );
  }
}
