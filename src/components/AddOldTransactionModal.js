import { useState, useEffect, useContext } from "react";
import { UserPortfolioContext } from "@/contexts/userContext";
import coinAmountConverter from "@/utils/coinAmoutConverter";
import { motion } from "framer-motion";

export default function AddOldTransactionModal({
  setModalVisible,
  coin,
  setToastVisible,
  infoAdded,
}) {
  const { addOrUpdateCoin } = useContext(UserPortfolioContext);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // yyyy-mm-dd
  const [priceAtPurchase, setPriceAtPurchase] = useState(
    coin.market_data.current_price.usd
  );
  const [userCash, setUserCash] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleAddCoin = () => {
    const total = coinAmountConverter(userCash, priceAtPurchase);
    infoAdded(
      `Added ${total}x ${coin.symbol.toUpperCase()} - ${userCash} USDT (on ${date})`
    );
    setModalVisible(false);
    setToastVisible(true);

    addOrUpdateCoin(
      coin.symbol,
      total,
      priceAtPurchase,
      userCash,
      coin.id,
      coin.image?.small
    );

    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const total = coinAmountConverter(userCash, priceAtPurchase);
    setAmount(parseFloat(total));
  }, [userCash, priceAtPurchase]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#1a1a2e]/95 backdrop-blur-xl border border-[#2a2a3e]/50 rounded-2xl shadow-2xl max-w-lg w-full mx-4"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#2a2a3e]/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={coin.image?.small}
                alt={coin.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-sm"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-200">
                Add Historical Transaction
              </h2>
              <p className="text-sm text-slate-400">
                Record a past transaction for {coin.name}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Transaction Date */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              Transaction Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-[#252540]/60 border border-[#3a3a5c]/40 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Investment Amount */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              Investment Amount (USDT)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-3 bg-[#252540]/60 border border-[#3a3a5c]/40 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                value={userCash}
                onChange={(e) => setUserCash(Number(e.target.value))}
                placeholder="Enter investment amount"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Purchase Price */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              Purchase Price per Unit (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-3 bg-[#252540]/60 border border-[#3a3a5c]/40 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                value={priceAtPurchase}
                onChange={(e) => setPriceAtPurchase(Number(e.target.value))}
                placeholder="Enter price per unit"
                min="0"
                step="0.000001"
              />
            </div>
          </div>

          {/* Calculation Display */}
          {userCash > 0 && priceAtPurchase > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-blue-400 text-sm">Total amount received:</span>
                <span className="text-blue-400 font-mono font-semibold">
                  {amount.toFixed(6)} {coin.symbol.toUpperCase()}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2a2a3e]/30 flex justify-end gap-3">
          <button
            onClick={() => setModalVisible(false)}
            className="px-4 py-2 text-slate-400 hover:text-slate-300 hover:bg-[#2a2a3e]/30 rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCoin}
            disabled={!userCash || userCash <= 0 || !priceAtPurchase || priceAtPurchase <= 0}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 shadow-lg disabled:shadow-none"
          >
            Add Transaction
          </button>
        </div>
      </motion.div>
    </div>
  );
}

