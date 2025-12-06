import connectDB from "@/libs/mongodb";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const userId = req.nextUrl.searchParams.get("userId");
    const username = req.nextUrl.searchParams.get("username");

    if (!userId && !username) {
      return NextResponse.json(
        { success: false, message: "User ID or Username is required" },
        { status: 400 }
      );
    }

    let foundUser;
    if (userId) {
      foundUser = await user.findById(userId);
    } else {
      foundUser = await user.findOne({ username });
    }

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: foundUser });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching user data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const { userId, ...changes } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $set: changes },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error updating user data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
