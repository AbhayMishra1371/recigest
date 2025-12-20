import { RecipeService } from "@/services/recipeService";

export async function generateRecipeWithGemini(foodItem: string) {
    return RecipeService.generateWithGemini(foodItem);
}
