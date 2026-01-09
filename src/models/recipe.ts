import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRecipe extends Document {
  user: mongoose.Schema.Types.ObjectId;

  author: {
    id?: mongoose.Schema.Types.ObjectId;
    name: string;
    type: "user" | "ai" | "external";
  };

  name: string;
  description?: string;
  cuisine?: string;

  time?: {
    prep?: string;
    cook?: string;
    total?: string;
  };

  difficulty?: string;
  calories?: string;

  macros?: {
    protein?: string;
    carbs?: string;
    fats?: string;
  };

  ingredients: string[];
  instructions: string[];
  tips?: string[];
  image?: string;
  source?: "ai" | "manual";
}

const RecipeSchema: Schema<IRecipe> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["user", "ai", "external"],
        default: "ai",
      },
    },

    name: { type: String, required: true },
    description: String,
    cuisine: String,

    time: {
      prep: String,
      cook: String,
      total: String,
    },

    difficulty: String,
    calories: String,

    macros: {
      protein: String,
      carbs: String,
      fats: String,
    },

    ingredients: {
      type: [String],
      required: true,
    },

    instructions: {
      type: [String],
      required: true,
    },

    tips: [String],
    image: String,

    source: {
      type: String,
      enum: ["ai", "manual"],
      default: "ai",
    },
  },
  { timestamps: true }
);

const Recipe: Model<IRecipe> =
  mongoose.models.Recipe || mongoose.model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
