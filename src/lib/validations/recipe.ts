import { z } from "zod";

export const recipeGenerateSchema = z.object({
  food: z.string().min(1, "Food item is required").max(100, "Query too long"),
});
