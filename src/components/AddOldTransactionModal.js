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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="z-50 bg-slate-800 border border-slate-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg max-w-md w-full flex flex-col justify-between"
      >
        <div className="p-8 pb-4 pt-7">
          <div className="flex items-center mb-5">
            <img
              src={coin.image?.small}
              alt={coin.name}
              className="w-8 h-8 mr-2"
            />
            <h2 className="text-xl font-semibold text-slate-300">
              Add {coin.name} to your Portfolio
            </h2>
          </div>
          <p className="text-sm text-slate-300 mb-3 p-3 bg-slate-800 rounded-md">
            Register and old transaction and update your portfolio
          </p>

          <label className="block text-sm font-medium text-gray-400 mb-1">
            Transaction date
          </label>
          <input
            type="date"
            className="text-sm w-full bg-slate-700 text-slate-200 px-3 py-2 rounded-md mb-4"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-400 mb-1">
            Inversion (USDT)
          </label>
          <input
            type="number"
            className="text-sm w-full bg-slate-700 text-slate-200 px-3 py-2 rounded-md mb-4"
            value={userCash}
            onChange={(e) => setUserCash(Number(e.target.value))}
            placeholder="Ej: 100"
          />

          <label className="block text-sm font-medium text-gray-400 mb-1">
            Purchase price per unit (USD)
          </label>
          <input
            type="number"
            className="text-sm w-full bg-slate-700 text-slate-200 px-3 py-2 rounded-md"
            value={priceAtPurchase}
            onChange={(e) => setPriceAtPurchase(Number(e.target.value))}
            placeholder="Ej: 27.40"
          />

          <div className="mt-2 text-sm text-slate-300">
            = <strong>{amount.toFixed(4)}</strong> {coin.symbol.toUpperCase()}
          </div>
        </div>

        <div className="bg-slate-800 mt-2 rounded-b-lg flex justify-end items-center space-x-2 p-3">
          <button
            onClick={() => setModalVisible(false)}
            className="text-sm text-gray-400 py-2 px-3 rounded-md hover:bg-red-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCoin}
            className="bg-green-600 text-sm text-white py-2 px-3 rounded-md hover:bg-green-500 transition-colors"
          >
            Add transaction
          </button>
        </div>
      </motion.div>
    </div>
  );
}

