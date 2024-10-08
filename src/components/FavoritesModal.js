import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getUserFavorites,
  favoritesHandlerDelete,
} from "@/utils/favoritesHandler";

export default function FavoritesModal({ setVisible, userId }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserFavorites(userId);
      if (res.success) setFavorites(res.data.favorites);
    };
    fetchData();
  }, []);

  const handleRemove = async (coin) => {
    const res = await favoritesHandlerDelete(userId, coin);
    if (res.success) {
      setFavorites((prev) => prev.filter((c) => c !== coin));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="z-50 flex flex-col bg-slate-800 border border-slate-800 fixed bg-opacity-35 backdrop-blur-lg rounded-lg shadow-lg p-5 max-w-sm w-full"
      >
        <h1>Modify you favorites list</h1>
        {favorites.length > 0 ? (
          <div className="flex flex-col gap-2 bg-gray-700 max-h-36 w-4/5 self-center shadow-lg mt-4 border overflow-y-scroll border-slate-600 bg-opacity-80 rounded-md h-full p-2 custom-scrollbar">
            <AnimatePresence>
              {favorites.map((coin) => (
                <motion.span
                  key={coin}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between text-sm p-1 rounded-md bg-slate-600 items-center pl-5 transition-all cursor-pointer hover:bg-slate-500 "
                >
                  {coin.toUpperCase()}
                  <button
                    onClick={() => handleRemove(coin)}
                    className="hover:bg-red-400 rounded-full p-1 justify-start transition-colors"
                  >
                    ❌
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center mt-4 text-gray-400">
            You don't have any favorite coins!
          </div>
        )}

        <button
          onClick={() => {
            setVisible(false);
          }}
          className="w-full font-semibold bg-violet-600 text-white py-2 px-4 rounded-md mt-5 hover:bg-violet-700 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
