import connectDB from "@/libs/mongodb";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  try {
    const { userId, coinId, coinImage } = await req.json();

    if (!userId || !coinId || !coinImage) {
      return NextResponse.json(
        { success: false, message: "userId, coinId, and coinImage required" },
        { status: 400 }
      );
    }

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: { coinId, coinImage } } },
      { new: true }
    );
    return NextResponse.json(
      { success: true, favorites: updatedUser.favorites },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Error adding to favorites",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectDB();

  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const coinId = req.nextUrl.searchParams.get("coinId");
    if (!userId || !coinId) {
      return NextResponse.json(
        { success: false, message: "userId and coinId required" },
        { status: 400 }
      );
    }
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $pull: { favorites: { coinId: coinId } } },
      { new: true }
    );
    return NextResponse.json(
      { success: true, favorites: updatedUser.favorites },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Error removing from favorites",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId required" },
        { status: 400 }
      );
    }

    const foundUser = await user.findByIdAndUpdate(userId);

    return NextResponse.json(
      { success: true, favorites: foundUser.favorites },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving favorites",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
