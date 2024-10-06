"use server";

import mongoose from "mongoose";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const initialUserTest = async (clerkId: string) => {
  connectToDatabase();

  const userTest = {
    clerkId,
    name: "thieng",
    username: "nguyenthieng0106",
    email: "nguyenthieng0106@gmail.com",
    joinedAt: new Date(),
    picture: "picture sample link",
    saved: new mongoose.Types.ObjectId(),
  };

  await User.create(userTest);
};
