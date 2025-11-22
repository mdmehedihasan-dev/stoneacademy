import { Router } from "express";
import { auth } from "../../middleware/auth";
import { createReport, getReports, blockUser, deleteActivity } from "./report.controller";

const router = Router();

// ===================Create a report===================
router.post("/", auth, createReport);

// ===================Admin routes===================
router.get("/", auth, getReports);
router.post("/block-user/:userId", auth, blockUser);
router.delete("/delete-activity/:activityId", auth, deleteActivity);

export default router;
