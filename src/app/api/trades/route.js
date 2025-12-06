import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Trade from "@/models/trade";
import User from "@/models/user";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Find the user first to get their _id if a username is passed, 
    // but here we expect the caller to pass the actual _id or we resolve it.
    // Let's assume the frontend passes the username and we need to find the user first,
    // OR the frontend passes the _id.
    // Given the context of the app, usually we might have the username in the URL.
    // Let's support looking up by username if the ID passed doesn't look like an ObjectId,
    // or just rely on the frontend passing the correct _id.
    // For safety, let's assume we might receive a username or an ID.
    
    let user;
    if (mongoose.Types.ObjectId.isValid(userId)) {
        user = await User.findById(userId);
    } else {
        user = await User.findOne({ username: userId });
    }

    if (!user) {
         return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const trades = await Trade.find({ userId: user._id }).sort({ date: -1 });

    return NextResponse.json({ success: true, trades });
  } catch (error) {
    console.error("Error fetching trades:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching trades" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { userId, symbol, type, entryPrice, exitPrice, investment, pnl, status } = body;

    if (!userId || !symbol || !type || !entryPrice || !exitPrice || !investment || !pnl || !status) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const trade = await Trade.create({
      userId,
      symbol,
      type,
      entryPrice,
      exitPrice,
      investment,
      pnl,
      status,
    });

    return NextResponse.json({ success: true, trade });
  } catch (error) {
    console.error("Error creating trade:", error);
    return NextResponse.json(
      { success: false, message: "Error creating trade" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Trade ID is required" },
        { status: 400 }
      );
    }

    await Trade.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Trade deleted" });
  } catch (error) {
    console.error("Error deleting trade:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting trade" },
      { status: 500 }
    );
  }
}
