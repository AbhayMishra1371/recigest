import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function generateRecipeWithGemini(foodItem: string) {
  try {
    if (!foodItem || foodItem.trim().length === 0) {
      throw new Error("Food item is required");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a professional chef and nutrition expert.

User searched for the food item: "${foodItem}"

Generate a complete recipe with the following format:

1. Dish Name
2. Short Description (2–3 lines)
3. Cuisine Type
4. Preparation Time
5. Cooking Time
6. Total Time
7. Ingredients (with exact quantities)
8. Step-by-step Cooking Instructions (numbered)
9. Cooking Tips
10. Nutritional Information (Calories, Protein, Carbs, Fat)
11. Best Side Dishes to Serve With
12. Storage Tips
13. Common Mistakes to Avoid

Rules:
- Keep instructions simple and beginner-friendly.
- Use widely available ingredients.
- Use metric units.
- Make it accurate and safe for consumption.
- If the dish is unhealthy, suggest a healthier alternative.

    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const recipeText = response.text();

    return {
      success: true,
      food: foodItem,
      recipe: recipeText,
    };
  } catch (error: any) {
    console.error("Gemini Recipe Error:", error);

    return {
      success: false,
      error: error.message || "Failed to generate recipe",
    };
  }
}
