import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  title: string;
  description: string;
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  date: Date;
  maxParticipants: number;
  participants: mongoose.Schema.Types.ObjectId[];
  creator: mongoose.Schema.Types.ObjectId;
  tags: string[];
}

const activitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },

    date: { type: Date, required: true },
    maxParticipants: { type: Number, default: 10 },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

//========== Create 2dsphere index for geo queries==========
activitySchema.index({ location: "2dsphere" });

export const Activity = mongoose.model<IActivity>("Activity", activitySchema);
