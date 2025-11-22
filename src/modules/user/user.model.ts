import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photo?: string;
  laps?: number;
  images?: string[];
  rating?: number;
  verified?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // ================= profile info ==================
    photo: { type: String, default: "" },
    laps: { type: Number, default: 0 }, 
    images: { type: [String], default: [] },
    rating: { type: Number, default: 5 },

    // ================= optional verification =================
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
