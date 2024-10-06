import mongoose, { model } from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

const portfolioSchema = new mongoose.Schema({
  coins: {
    btc: {
      transactions: [transactionSchema],
      totalAmount: { type: Number, default: 0 },
    },
    eth: {
      transactions: [transactionSchema],
      totalAmount: { type: Number, default: 0 },
    },
  },
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
  portfolio: portfolioSchema,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
