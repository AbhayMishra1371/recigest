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
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const prompt = `
You are a professional chef and nutrition expert.
Generate a complete recipe for "${foodItem}" in valid JSON only (no markdown).
Include:
Name, description (2–3 lines), cuisine
Time (prep, cook, total)
Difficulty, calories, macros
Ingredients list
Step-by-step instructions
Helpful cooking tips
Guidelines:
Use simple, beginner-friendly steps
Use common ingredients and metric units
Ensure food safety
If unhealthy, suggest a healthier alternative in tips
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
      
      // Clean up potential markdown formatting
      recipeText = recipeText.replace(/```json/g, "").replace(/```/g, "").trim();

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
