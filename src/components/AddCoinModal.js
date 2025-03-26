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
          <p className="text-gray-400 text-sm">
            Date <strong>{date.toLocaleDateString()}</strong>
          </p>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Enter your investment (USDT)
          </label>
          <input
            type="number"
            className="text-sm w-1/2 text-slate-300 bg-slate-800 px-3 py-2 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-600 transition-all"
            value={userCash}
            onChange={(e) => setUserCash(e.target.value)}
            placeholder={`Enter your investment`}
          />
          <span className="text-sm text-slate-300 ml-2">
            = {amount} {coin.symbol.toUpperCase()}
          </span>
        </div>
        <div className="bg-slate-800 mt-2 rounded-b-lg flex justify-end items-center space-x-2 p-3">
          <button
            onClick={() => {
              setModalVisible(false);
            }}
            className="text-sm text-gray-400 py-2 px-3 rounded-md hover:bg-red-500 hover:text-slate-200 transition-colors"
          >
            Discard
          </button>

          <button
            onClick={handleAddCoin}
            className="bg-green-600 text-sm text-white py-2 px-3 rounded-md hover:bg-green-500 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
