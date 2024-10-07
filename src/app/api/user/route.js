import connectDB from "@/libs/mongodb";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const foundUser = await User.findById(userId);

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
