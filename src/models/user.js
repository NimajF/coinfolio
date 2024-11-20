import mongoose, { model } from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  transactionInversion: { type: Number, required: true, default: 0 },
  date: { type: Date, required: true },
});

const coinSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  coinId: { type: String, required: true },
  coinImage: { type: String, required: true },
  transactions: [transactionSchema],
  totalAmount: { type: Number, default: 0 },
  totalCoinInversion: { type: Number, default: 0 },
});

const portfolioSchema = new mongoose.Schema({
  coins: [coinSchema],
  totalInvestment: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  portfolio: {
    type: portfolioSchema,
    default: () => ({}),
  },
  favorites: {
    type: Array,
    required: false,
    default: [],
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
