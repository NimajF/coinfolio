import connectDB from "@/libs/mongodb";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await connectDB();

  try {
    const data = await req.json();
    const { userId } = data;
    const existingUser = await user.findById(
    userId
    );

    if (!existingUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
    }
    existingUser.portfolio = {};
    await existingUser.save();
   
    return NextResponse.json(
      { success: true, message: "Portfolio removed successfully", existingUser },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting portfolio",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
