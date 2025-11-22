import { Router } from "express";
import { auth } from "../../middleware/auth";
import { createActivity, getNearbyActivities, joinActivity } from "./activity.controller";

const router = Router();

//================  Create activity (authenticated)================ 
router.post("/", auth, createActivity);

//================  Get nearby activities================ 
router.get("/nearby", getNearbyActivities);

// ================ Join activity================ 
router.post("/join/:id", auth, joinActivity);

export default router;
