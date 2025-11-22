import { Request, Response } from "express";
import { Report } from "./report.model";
import { User } from "../user/user.model";
import { Activity } from "../activity/activity.model";

//===================  CREATE REPORT=================== 
export const createReport = async (req: any, res: Response) => {
  try {
    const { reportedUser, reportedActivity, reason } = req.body;

    const report = await Report.create({
      reporter: req.user.id,
      reportedUser,
      reportedActivity,
      reason,
    });

    return res.status(201).json(report);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// ================ GET ALL REPORTS (Admin)=================== 
export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find()
      .populate("reporter reportedUser reportedActivity", "name title")
      .sort({ createdAt: -1 });

    return res.json(reports);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

//===================  BLOCK USER=================== 
export const blockUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { verified: false });
    return res.json({ message: "User blocked" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

//===================  DELETE ACTIVITY=================== 
export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const { activityId } = req.params;
    await Activity.findByIdAndDelete(activityId);
    return res.json({ message: "Activity deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
