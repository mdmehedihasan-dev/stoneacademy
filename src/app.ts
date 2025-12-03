import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= Import Routes ============= 
import userRoutes from "./modules/user/user.routes";
import activityRoutes from "./modules/activity/activity.routes";
import messageRoutes from "./modules/message/message.routes";
import reportRoutes from "./modules/report/report.routes";

// ============= Main Routes ============= 
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reports", reportRoutes);

// app.get("/", (req, res) => {
//   res.send("Activity App Backend Running...");
// });

app.get("/", (req, res) => {
  res.send(`
    <div style="
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 30px;
    ">
      <h1 style="color: #4CAF50;">Activity App Backend</h1>
      <p style="font-size: 18px; color: #333;">
        Backend Server is Running Successfully 
      </p>
      <hr style="margin: 20px 0;" />
      <p style="color: #666;">
        Developed by <strong> Md Mehedi Hasan</strong>
      </p>
    </div>
  `);
});

// app.get("/", (req, res) => {
//   res.send(`
// --------------------------------------------------
//         🚀 ACTIVITY APP BACKEND RUNNING
// --------------------------------------------------
//       Status: OK
//       Timestamp: ${new Date().toISOString()}
// --------------------------------------------------
//   `);
// });





export default app;
