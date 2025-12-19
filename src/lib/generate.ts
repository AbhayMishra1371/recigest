import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function generateRecipeWithGemini(foodItem: string) {
  try {
    if (!foodItem || foodItem.trim().length === 0) {
      throw new Error("Food item is required");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
,
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
    let recipeText = response.text();
    
    // Clean up potential markdown formatting if the model disobeys
    recipeText = recipeText.replace(/```json/g, "").replace(/```/g, "").trim();

    return {
      success: true,
      food: foodItem,
      recipe: recipeText, // We return the stringified JSON to be parsed by the frontend or API handler
    };
  } catch (error: any) {
    console.error("Gemini Recipe Error:", error);

    return {
      success: false,
      error: error.message || "Failed to generate recipe",
    };
  }
}
