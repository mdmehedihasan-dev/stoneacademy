import { Request, Response } from "express";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ============= REGISTER =============
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    return res.status(201).json({ message: "User registered", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// ================== LOGIN  =====================
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.json({ message: "Login success", token, user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// ====================== GET MY PROFILE =====================
export const getMyProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
