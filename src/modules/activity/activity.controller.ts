import { Request, Response } from "express";
import { Activity } from "./activity.model";

// ====================CREATE ACTIVITY====================
export const createActivity = async (req: any, res: Response) => {
  try {
    const { title, description, lng, lat, date, maxParticipants, tags } = req.body;

    const activity = await Activity.create({
      title,
      description,
      location: { type: "Point", coordinates: [lng, lat] },
      date,
      maxParticipants,
      creator: req.user.id,
      participants: [req.user.id],
      tags,
    });

    return res.status(201).json(activity);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// ====================GET NEARBY ACTIVITIES====================
export const getNearbyActivities = async (req: Request, res: Response) => {
  try {
    const { lng, lat, radius = 5 } = req.query; // radius in km

    const activities = await Activity.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng as string), parseFloat(lat as string)], (parseFloat(radius as string) / 6378.1)],
        },
      },
    }).populate("creator participants", "name photo");

    return res.json(activities);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

//==================== JOIN ACTIVITY====================
export const joinActivity = async (req: any, res: Response) => {
  try {
    const { id } = req.params; // activity ID

    const activity = await Activity.findById(id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    if (activity.participants.includes(req.user.id))
      return res.status(400).json({ message: "Already joined" });

    if (activity.participants.length >= activity.maxParticipants)
      return res.status(400).json({ message: "Activity is full" });

    activity.participants.push(req.user.id);
    await activity.save();

    return res.json({ message: "Joined activity", activity });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
