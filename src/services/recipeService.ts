import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecipeData, RecipeGenerationResponse } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export class RecipeService {
  /**
   * @param foodItem The food item to generate a recipe for.
   */
  static async generateWithGemini(foodItem: string): Promise<RecipeGenerationResponse> {
    try {
      if (!foodItem || foodItem.trim().length === 0) {
        throw new Error("Food item is required");
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const prompt = `
You are a professional chef and nutrition expert.
Generate a complete recipe for "${foodItem}" in valid JSON only.
CRITICAL: Do NOT use markdown formatting (like asterisks for bold or bullet points) anywhere inside the JSON values. Use plain text only.

Include:
- name: Dish name
- description: 2–3 lines describing the dish
- cuisine: Cuisine type
- visual_prompt: A highly descriptive, one-line prompt for an AI image generator. It should describe the dish in a professional food photography style (e.g., "A rustic porcelain bowl of creamy mushroom risotto garnished with fresh thyme and shaved parmesan, soft natural lighting, macro food photography"). it will bbe to time consuming give a small propmt for this- time: Object with prep, cook, total
- difficulty: Easy, Medium, or Hard
- calories: Total calories per serving
- macros: Object with protein, carbs, fats
- ingredients: Array of strings
- instructions: Array of step-by-step strings
- tips: Array of helpful cooking tips
Guidelines:
- Use simple, beginner-friendly steps
- Use common ingredients and metric units
- Ensure food safety
- If unhealthy, suggest a healthier alternative in tips
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      
      if (!response || !response.candidates || response.candidates.length === 0) {
        throw new Error("No recipe was generated. The chef might be busy or the request was filtered.");
      }

      let recipeText = response.text();
      
      if (!recipeText) {
        throw new Error("The chef returned an empty plate. Please try a different dish.");
      }
      
      // Clean up potential markdown formatting and strip unwanted characters
      recipeText = recipeText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/\*/g, "") // Strip all asterisks
        .trim();

      return {
        success: true,
        food: foodItem,
        recipe: recipeText,
      };
    } catch (error: any) {
      console.error("Recipe Service Error:", error);
      return {
        success: false,
        error: error.message || "Failed to generate recipe",
      };
    }
  }
}
