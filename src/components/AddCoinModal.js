import { useState, useEffect, useContext } from "react";
import { UserPortfolioContext } from "@/contexts/userContext";
import coinAmountConverter from "@/utils/coinAmoutConverter";
import { motion } from "framer-motion";

export default function AddCoinModal({
  setModalVisible,
  coin,
  setToastVisible,
  infoAdded,
}) {
  const { addOrUpdateCoin } = useContext(UserPortfolioContext);
  const initialState = new Date();
  const [date] = useState(initialState);
  const [amount, setAmount] = useState(0);
  const [userCash, setUserCash] = useState(0);

  const handleAddCoin = () => {
    let total = coinAmountConverter(
      userCash,
      coin.market_data.current_price.usd
    );
    infoAdded(
      `Added ${amount}x ${coin.symbol.toUpperCase()} - ${userCash} USDT`
    );
    setModalVisible(false);
    // alert(`Added ${total}x ${coin.symbol.toUpperCase()} - ${userCash} USDT`);
    setToastVisible(true);
    addOrUpdateCoin(
      coin.symbol,
      amount,
      coin.market_data.current_price.usd,
      userCash,
      coin.id,
      coin.image?.small
    );
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  useEffect(() => {
    let total = coinAmountConverter(
      userCash,
      coin.market_data.current_price.usd
    );
    setAmount(total);
  }, [userCash]);
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
                Add {coin.name}
              </h2>
              <p className="text-sm text-slate-400">
                Add to your portfolio at current price
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Current Info */}
          <div className="bg-[#252540]/40 rounded-xl p-4 border border-[#3a3a5c]/20">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Date</span>
                <p className="text-slate-200 font-medium">{date.toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-slate-400">Current Price</span>
                <p className="text-slate-200 font-mono font-medium">
                  ${coin.market_data.current_price.usd.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Investment Input */}
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
                onChange={(e) => setUserCash(e.target.value)}
                placeholder="Enter amount to invest"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Calculation Display */}
            {userCash > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/20 rounded-xl p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-sm">You will receive:</span>
                  <span className="text-green-400 font-mono font-semibold">
                    {amount} {coin.symbol.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
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
            disabled={!userCash || userCash <= 0}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 shadow-lg disabled:shadow-none"
          >
            Add to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
