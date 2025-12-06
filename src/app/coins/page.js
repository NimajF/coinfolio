"use client";

import SearchBar from "@/components/SearchBar";
import CoinList from "@/components/CoinList/CoinList";
import Ticker from "@/components/CoinList/Ticker";
import { motion } from "framer-motion";

export default function CoinsHomePage() {
  return (
    <div className="flex flex-col w-full xl:w-full mx-auto min-h-screen text-white py-8 bg-gradient-to-br from-[#0a0a15] via-[#12121d] to-[#1a1a2e]">
      {/* Top Section */}
      <div className="max-sm:p-2 relative">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-3xl" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Cryptocurrency Markets
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="text-lg text-slate-400"
            >
              Track prices, analyze trends, and discover opportunities
            </motion.p>
          </motion.div>
          
          <SearchBar />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="sticky top-0 z-50 mt-6"
          >
            <Ticker />
          </motion.div>
        </div>
      </div>
      
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="bg-[#12121d]/80 backdrop-blur-xl border border-[#1b1b29]/50 rounded-2xl mt-10 flex flex-col items-center w-full p-6 max-md:p-0 max-md:mt-5 max-md:rounded-none shadow-2xl"
      >
        <div className="w-full max-w-7xl">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-2xl font-semibold text-slate-200">
              Top Cryptocurrencies
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Live Data
            </div>
          </div>
          <CoinList />
        </div>
      </motion.section>
    </div>
  );
}
