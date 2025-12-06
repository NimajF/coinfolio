import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  getUserFavorites,
  favoritesHandlerDelete,
} from "@/utils/favoritesHandler";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function FavoritesModal({ setVisible, userId }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserFavorites(userId);
      if (res.success) setFavorites(res.data.favorites);
    };
    fetchData();
  }, [userId]);

  const handleRemove = async (coin) => {
    const res = await favoritesHandlerDelete(userId, coin);
    if (res.success) {
      setFavorites((prev) => prev.filter((c) => c.coinId !== coin));
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setVisible(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-[#1a1a2e]/80 backdrop-blur-xl border border-[#2a2a3e] rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#2a2a3e]/50 flex justify-between items-center bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
          <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text">
            Your Favorites
          </h2>
          <button
            onClick={() => setVisible(false)}
            className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {favorites.length > 0 ? (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {favorites.map((coin) => (
                  <motion.div
                    key={coin.coinId}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="group flex items-center justify-between p-3 rounded-xl bg-[#0a0a15]/40 border border-[#2a2a3e]/30 hover:border-indigo-500/30 hover:bg-[#0a0a15]/60 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#2a2a3e] shadow-sm">
                        <Image
                          src={coin.coinImage}
                          alt={coin.coinId}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {coin.coinId.toUpperCase()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemove(coin.coinId)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Remove from favorites"
                    >
                      <FaTrash size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="text-4xl mb-3 opacity-20">⭐</div>
              <p className="text-slate-400 text-sm">
                No favorite coins yet.
                <br />
                Start exploring to add some!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2a2a3e]/50 bg-[#0a0a15]/20">
          <button
            onClick={() => setVisible(false)}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
