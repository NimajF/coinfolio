"use client";

import SearchBar from "@/components/SearchBar";
import CoinList from "@/components/CoinList/CoinList";
import Ticker from "@/components/CoinList/Ticker";
import { motion } from "framer-motion";

export default function CoinsHomePage() {
  return (
    <div className="flex flex-col w-full xl:w-full mx-auto min-h-screen text-white py-8">
      {/* Top Section */}
      <div className="max-sm:p-2">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          className="text-2xl -mb-6 mt-6 text-center text-slate-200"
        >
          Wanna start? Give it a chance and search for your coins
        </motion.p>
        <SearchBar />
        <div className="sticky top-0 z-50">
          <Ticker />
        </div>
      </div>
      <section className="bg-[#12121d] backdrop-blur-sm border-t border-[#1b1b29] mt-10 flex flex-col items-center w-full p-6 max-md:p-0 max-md:mt-5">
        <CoinList />
      </section>
    </div>
  );
}
