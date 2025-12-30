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

User searched for the food item: "${foodItem}"

Generate a complete recipe in strictly VALID JSON format. Do not include markdown code blocks (like \`\`\`json). Just the raw JSON string.

Schema:
{
  "name": "Dish Name",
  "description": "Short appetizing description (2-3 lines)",
  "cuisine": "Cuisine Type",
  "time": {
    "prep": "10 min",
    "cook": "20 min",
    "total": "30 min"
  },
  "difficulty": "Easy/Medium/Hard",
  "calories": "500 kcal",
  "macros": {
    "protein": "20g",
    "carbs": "50g",
    "fats": "15g"
  },
  "ingredients": [
    "2 cups Rice",
    "500g Chicken Breast"
  ],
  "instructions": [
    "Step 1 description...",
    "Step 2 description..."
  ],
  "tips": [
    "Cooking tip 1",
    "Cooking tip 2"
  ]
}

Rules:
- Keep instructions simple and beginner-friendly.
- Use widely available ingredients.
- Use metric units.
- Make it accurate and safe for consumption.
- If the dish is unhealthy, suggest a healthier alternative in the tips.
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
