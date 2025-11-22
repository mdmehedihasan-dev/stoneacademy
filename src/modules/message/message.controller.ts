import { Request, Response } from "express";
import { Message } from "./message.model";

//=======================  SEND MESSAGE======================= 
export const sendMessage = async (req: any, res: Response) => {
  try {
    const { receiver, activity, message } = req.body;

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver,
      activity,
      message,
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

//=======================  GET MESSAGES FOR ACTIVITY BETWEEN USERS======================= 
export const getMessages = async (req: any, res: Response) => {
  try {
    const { activityId, userId } = req.query;

    const messages = await Message.find({
      activity: activityId,
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender receiver", "name photo");

    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
