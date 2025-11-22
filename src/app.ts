// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= Import Routes============= 
import userRoutes from "./modules/user/user.routes";
import activityRoutes from "./modules/activity/activity.routes";
import messageRoutes from "./modules/message/message.routes";
import reportRoutes from "./modules/report/report.routes";

// ============= Main Routes============= 
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("Activity App Backend Running...");
});

export default app;
