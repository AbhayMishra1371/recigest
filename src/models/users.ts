import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;  
  provider: "local" | "google";
  isPrivate: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,

      // password is required ONLY for local users
      required: function (this: IUser) {
        return this.provider === "local";
      },

      default: null,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
