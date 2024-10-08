"use server";

import mongoose from "mongoose";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";

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

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  const { clerkId, updateData, path } = params;

  try {
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    const { clerkId } = params;

    const userFound = await User.findOneAndDelete({ clerkId });

    if (!userFound) {
      throw new Error("User not found");
    }

    // delete all relative with user
    // like: question, comment, answers, ....

    // TODO: delete user answers, comments, etc.
    const deletedUser = await User.findByIdAndDelete(userFound._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
