import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Long", "Short"],
    required: true,
  },
  entryPrice: {
    type: Number,
    required: true,
  },
  exitPrice: {
    type: Number,
    required: true,
  },
  investment: {
    type: Number,
    required: true,
  },
  pnl: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Win", "Loss"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Trade || mongoose.model("Trade", tradeSchema);
