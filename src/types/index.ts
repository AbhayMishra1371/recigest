export interface User {
  userId?: string;
  name: string;
  email: string;
  isPrivate?: boolean;
}

export interface RecipeData {
  name: string;
  description: string;
  cuisine: string;
  time: {
    prep: string;
    cook: string;
    total: string;
  };
  difficulty: string;
  calories: string;
  macros: {
    protein: string;
    carbs: string;
    fats: string;
  };
  ingredients: string[];
  instructions: string[];
  tips: string[];
}

export interface RecipeGenerationResponse {
  success: boolean;
  food?: string;
  recipe?: string;
  error?: string;
}
