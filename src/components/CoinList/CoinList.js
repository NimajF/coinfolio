"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import SortTable from "./SortTable";
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import { motion } from "framer-motion";

export default function CoinList() {
  const [data, setData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const fetchCoinsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/coins', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      
      if (json.success && json.data) {
        setData(json.data);
      } else {
        throw new Error(json.error || 'Failed to fetch data');
      }
    } catch (err) {
      console.error("Error fetching coins:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoinsData();
    
    const interval = setInterval(fetchCoinsData, 30000);
    
    return () => clearInterval(interval);
  }, [fetchCoinsData]);

  const handleOption = useCallback((option) => {
    let newDirection = "asc";

    if (sortCriteria === option) {
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    }

    setSortCriteria(option);
    setSortDirection(newDirection);

    const sortedData = [...data].sort((a, b) => {
      switch (option) {
        case "rank":
          return newDirection === "asc"
            ? a.market_cap_rank - b.market_cap_rank
            : b.market_cap_rank - a.market_cap_rank;
        case "name":
          return newDirection === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "price":
          return newDirection === "asc"
            ? a.current_price - b.current_price
            : b.current_price - a.current_price;
        case "change":
          return newDirection === "asc"
            ? a.price_change_percentage_24h_in_currency -
                b.price_change_percentage_24h_in_currency
            : b.price_change_percentage_24h_in_currency -
                a.price_change_percentage_24h_in_currency;
        case "marketCap":
          return newDirection === "asc"
            ? a.market_cap - b.market_cap
            : b.market_cap - a.market_cap;
        default:
          return 0;
      }
    });

    setData(sortedData);
  }, [sortCriteria, sortDirection, data]);

  if (loading) {
    return (
      <div className="w-full max-w-7xl rounded-xl overflow-hidden">
        <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-xl">
          <div className="animate-pulse">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 border-b border-[#252531]/50">
                <div className="w-8 h-8 bg-slate-700/50 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-700/50 rounded w-1/4"></div>
                  <div className="h-3 bg-slate-700/50 rounded w-1/6"></div>
                </div>
                <div className="h-4 bg-slate-700/50 rounded w-20"></div>
                <div className="h-4 bg-slate-700/50 rounded w-16"></div>
                <div className="h-4 bg-slate-700/50 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl rounded-xl overflow-hidden">
        <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error loading data</h3>
          <p className="text-slate-400 mb-4">{error}</p>
          <button
            onClick={fetchCoinsData}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl rounded-xl overflow-hidden">
      <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-xl overflow-hidden">
        <table className="min-w-full text-slate-300">
          <SortTable handleOption={handleOption} />
          <tbody>
            {data && data.length > 0
              ? data.map((crypto, index) => (
                  <motion.tr
                    key={crypto.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => router.push(`/coins/${crypto.id}`)}
                    className="text-sm border-b border-[#252531]/50 hover:bg-[#1f1f2e]/80 transition-all duration-200 cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-sans text-slate-400 group-hover:text-slate-300">
                      #{crypto.market_cap_rank}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={crypto.image}
                            alt={crypto.name}
                            className="w-8 h-8 mr-3 rounded-full"
                            loading="lazy"
                          />
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-200 font-semibold group-hover:text-white transition-colors">
                            {crypto.name}
                          </span>
                          <span className="text-slate-400 uppercase text-xs font-sans">
                            {crypto.symbol}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-sans">
                      <span className="text-slate-300 font-semibold font-roboto group-hover:text-white">
                        ${crypto.current_price?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 6 
                        }) || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        crypto.price_change_percentage_24h > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}>
                        <span className="font-roboto font-semibold">
                          {crypto.price_change_percentage_24h > 0 ? "+" : ""}
                          {crypto.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
                        </span>
                        {crypto.price_change_percentage_24h > 0 ? (
                          <IoTrendingUp className="w-4 h-4" />
                        ) : (
                          <IoTrendingDown className="w-4 h-4" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-sans">
                      <div className="flex flex-col items-end">
                        <span className="text-slate-200 font-roboto font-semibold">
                          ${crypto.market_cap ? (crypto.market_cap / 1e9).toFixed(2) : 'N/A'}B
                        </span>
                        <span className="text-slate-500 font-poppins text-xs">
                          ${crypto.market_cap?.toLocaleString() || 'N/A'}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}