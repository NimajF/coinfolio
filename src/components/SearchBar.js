"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/coins/${searchTerm.trim().toLowerCase()}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      className="max-w-2xl w-full mx-auto mt-8 px-4"
    >
      <form onSubmit={handleSubmit} className="relative group">
        {/* Background with gradient border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-300 blur-sm"></div>
        
        <div className="relative bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl border border-[#2a2a3e] overflow-hidden">
          <div className="flex items-center">
            <div className="pl-6 pr-3 py-4">
              <motion.svg
                animate={{
                  scale: isFocused ? 1.1 : 1,
                  rotate: isFocused ? 5 : 0
                }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </motion.svg>
            </div>
            
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search cryptocurrencies... (e.g., bitcoin, ethereum)"
              className="flex-1 bg-transparent text-white placeholder-slate-400 text-lg py-4 pr-4 focus:outline-none font-medium"
            />
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mr-3 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
            >
              Search
            </motion.button>
          </div>
          
          {/* Bottom accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isFocused ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
            className="h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>
        
        {/* Search suggestions hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isFocused ? 1 : 0, y: isFocused ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 mt-2 text-center"
        >
          <p className="text-sm text-slate-500">
            Popular: <span className="text-indigo-400 cursor-pointer hover:text-indigo-300">Bitcoin</span>, <span className="text-purple-400 cursor-pointer hover:text-purple-300">Ethereum</span>, <span className="text-blue-400 cursor-pointer hover:text-blue-300">Solana</span>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}
