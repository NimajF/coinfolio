"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoSwapVertical } from "react-icons/io5";

export default function SpotOrderCalculator({ coin }) {
  const [orderType, setOrderType] = useState("buy"); 
  const [price, setPrice] = useState(coin?.market_data?.current_price?.usd || 0);
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [isMarketPrice, setIsMarketPrice] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);

  const [availableUSDT] = useState(1000);
  const [availableCoin] = useState(50);

  useEffect(() => {
    if (coin?.market_data?.current_price?.usd) {
      setPrice(coin.market_data.current_price.usd);
    }
  }, [coin]);

  useEffect(() => {
    if (amount && price) {
      const calculatedTotal = (parseFloat(amount) * parseFloat(price)).toFixed(2);
      setTotal(calculatedTotal);
    } else if (total && price && orderType === "buy") {
      const calculatedAmount = (parseFloat(total) / parseFloat(price)).toFixed(6);
      setAmount(calculatedAmount);
    }
  }, [amount, price, total, orderType]);

  const handleSliderChange = (percentage) => {
    setSliderValue(percentage);
    if (orderType === "buy") {
      const maxTotal = availableUSDT * (percentage / 100);
      setTotal(maxTotal.toFixed(2));
      if (price) {
        const calculatedAmount = (maxTotal / parseFloat(price)).toFixed(6);
        setAmount(calculatedAmount);
      }
    } else {
      const maxAmount = availableCoin * (percentage / 100);
      setAmount(maxAmount.toFixed(6));
      if (price) {
        const calculatedTotal = (maxAmount * parseFloat(price)).toFixed(2);
        setTotal(calculatedTotal);
      }
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setSliderValue(0); // Reset slider when manually typing
  };

  const handleTotalChange = (e) => {
    const value = e.target.value;
    setTotal(value);
    setSliderValue(0); // Reset slider when manually typing
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    setIsMarketPrice(false);
  };

  const resetToMarketPrice = () => {
    setPrice(coin?.market_data?.current_price?.usd || 0);
    setIsMarketPrice(true);
  };

  const switchOrderType = () => {
    setOrderType(orderType === "buy" ? "sell" : "buy");
    setAmount("");
    setTotal("");
    setSliderValue(0);
  };

  const handleSubmitOrder = () => {
    // Here you would handle the order submission
    console.log("Order submitted:", {
      type: orderType,
      price: parseFloat(price),
      amount: parseFloat(amount),
      total: parseFloat(total),
      symbol: coin?.symbol
    });
  };

  const maxAvailable = orderType === "buy" ? availableUSDT : availableCoin;
  const availableLabel = orderType === "buy" ? "USDT" : coin?.symbol?.toUpperCase() || "COIN";
  const estimatedFee = parseFloat(total) * 0.001; // 0.1% fee

  return (
    <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Spot Trading</h3>
        <button
          onClick={switchOrderType}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <IoSwapVertical />
          Switch
        </button>
      </div>

      {/* Order Type Tabs */}
      <div className="flex mb-6">
        <button
          onClick={() => setOrderType("buy")}
          className={`flex-1 py-3 px-4 rounded-l-xl font-semibold transition-all ${
            orderType === "buy"
              ? "bg-green-500/20 text-green-400 border-2 border-green-500/50"
              : "bg-[#1a1a2e]/40 text-slate-400 border-2 border-[#2a2a3e]/50 hover:bg-[#2a2a3e]/60"
          }`}
        >
          Buy {coin?.symbol?.toUpperCase()}
        </button>
        <button
          onClick={() => setOrderType("sell")}
          className={`flex-1 py-3 px-4 rounded-r-xl font-semibold transition-all ${
            orderType === "sell"
              ? "bg-red-500/20 text-red-400 border-2 border-red-500/50"
              : "bg-[#1a1a2e]/40 text-slate-400 border-2 border-[#2a2a3e]/50 hover:bg-[#2a2a3e]/60"
          }`}
        >
          Sell {coin?.symbol?.toUpperCase()}
        </button>
      </div>

      {/* Price Input */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-slate-400">Price</label>
          {!isMarketPrice && (
            <button
              onClick={resetToMarketPrice}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Market Price
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            step="0.000001"
            className="no-spinner w-full bg-[#0a0a15]/60 border border-[#2a2a3e] rounded-xl px-4 py-3 text-white font-roboto focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
            placeholder="0.00"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            USDT
          </span>
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-slate-400">Amount</label>
          <span className="text-xs text-slate-500">
            Available: {maxAvailable.toFixed(orderType === "buy" ? 2 : 6)} {availableLabel}
          </span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            step="0.000001"
            className="no-spinner w-full bg-[#0a0a15]/60 border border-[#2a2a3e] rounded-xl px-4 py-3 text-white font-roboto focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
            placeholder="0.000000"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            {coin?.symbol?.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Percentage Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[25, 50, 75, 100].map((percentage) => (
          <button
            key={percentage}
            onClick={() => handleSliderChange(percentage)}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              sliderValue === percentage
                ? "bg-indigo-500/30 text-indigo-300 border border-indigo-500/50"
                : "bg-[#1a1a2e]/40 text-slate-400 border border-[#2a2a3e]/50 hover:bg-[#2a2a3e]/60"
            }`}
          >
            {percentage}%
          </button>
        ))}
      </div>

      {/* Total Input */}
      <div className="mb-6">
        <label className="block text-sm text-slate-400 mb-2">Total</label>
        <div className="relative">
          <input
            type="number"
            value={total}
            onChange={handleTotalChange}
            step="0.01"
            className="no-spinner w-full bg-[#0a0a15]/60 border border-[#2a2a3e] rounded-xl px-4 py-3 text-white font-roboto focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
            placeholder="0.00"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            USDT
          </span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-[#0a0a15]/60 rounded-xl p-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Available:</span>
          <span className="text-slate-300 font-roboto">
            {orderType === "buy" 
              ? `${availableUSDT.toLocaleString()} USDT`
              : `${availableCoin.toFixed(6)} ${coin?.symbol?.toUpperCase()}`
            }
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Max {orderType === "buy" ? "Buy" : "Sell"}:</span>
          <span className="text-slate-300 font-roboto">
            {orderType === "buy" 
              ? `${(availableUSDT / parseFloat(price || 1)).toFixed(6)} ${coin?.symbol?.toUpperCase()}`
              : `${availableCoin.toFixed(6)} ${coin?.symbol?.toUpperCase()}`
            }
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Est. Fee:</span>
          <span className="text-slate-300 font-roboto">
            {estimatedFee ? `${estimatedFee.toFixed(4)} USDT` : "0.0000 USDT"}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitOrder}
        disabled={!amount || !price || !total}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
          orderType === "buy"
            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white disabled:from-gray-600 disabled:to-gray-700"
            : "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white disabled:from-gray-600 disabled:to-gray-700"
        } disabled:cursor-not-allowed disabled:text-gray-400`}
      >
        {orderType === "buy" ? `Buy ${coin?.symbol?.toUpperCase()}` : `Sell ${coin?.symbol?.toUpperCase()}`}
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-slate-500 mt-4 text-center">
        This is a demo calculator. No real trades will be executed.
      </p>
    </div>
  );
}