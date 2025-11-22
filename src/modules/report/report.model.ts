import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  reporter: mongoose.Schema.Types.ObjectId;
  reportedUser?: mongoose.Schema.Types.ObjectId;
  reportedActivity?: mongoose.Schema.Types.ObjectId;
  reason: string;
  status: "pending" | "reviewed" | "resolved";
}

const reportSchema = new Schema<IReport>(
  {
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reportedActivity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "reviewed", "resolved"], default: "pending" },
  },
  { timestamps: true }
);

export const Report = mongoose.model<IReport>("Report", reportSchema);
