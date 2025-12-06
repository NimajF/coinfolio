"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import TradeList from "@/components/TradeList";
import AddTradeForm from "@/components/AddTradeForm";
import Head from "next/head";
import { IoArrowBack } from "react-icons/io5";

export default function TradesPage({ params }) {
  const { data: session } = useSession();
  const { id } = params;
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      document.title = "Futures Journal - Coinfolio";
    }
  }, [session]);

  const fetchTrades = async (userId) => {
    try {
      const res = await axios.get(`/api/trades?userId=${userId}`);
      if (res.data.success) {
        setTrades(res.data.trades);
      }
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user?username=${id}`);
        if (res.data.success) {
          setUserData(res.data.user);
          fetchTrades(res.data.user._id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleAddTrade = async (tradeData) => {
    try {
      const res = await axios.post("/api/trades", tradeData);
      if (res.data.success) {
        setTrades([res.data.trade, ...trades]);
      }
    } catch (error) {
      console.error("Error adding trade:", error);
    }
  };

  const handleDeleteTrade = async (tradeId) => {
    if (!confirm("Are you sure you want to delete this trade?")) return;
    try {
      const res = await axios.delete(`/api/trades?id=${tradeId}`);
      if (res.data.success) {
        setTrades(trades.filter((t) => t._id !== tradeId));
      }
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

  const calculateStats = () => {
    const totalPnL = trades.reduce((acc, curr) => acc + curr.pnl, 0);
    const wins = trades.filter((t) => t.status === "Win").length;
    const totalTrades = trades.length;
    const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0;
    return { totalPnL, winRate, totalTrades };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a15] text-white">
        Loading...
      </div>
    );
  }

  const isOwner = session?.user?.username === id;

  return (
    <>
      <Head>
        <title>Futures Journal | Coinfolio</title>
      </Head>
      <div className="-mt-5 min-h-screen w-full bg-gradient-to-br from-[#0a0a15] via-[#12121d] to-[#1a1a2e] text-white relative overflow-hidden pt-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
            >
              <IoArrowBack className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
              Futures Trading Journal
            </h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-slate-400 text-sm mb-2">Total PnL</h3>
              <p
                className={`text-3xl font-bold ${
                  stats.totalPnL >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {stats.totalPnL >= 0 ? "+" : ""}
                ${stats.totalPnL.toFixed(2)}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-slate-400 text-sm mb-2">Win Rate</h3>
              <p className="text-3xl font-bold text-blue-400">
                {stats.winRate}%
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-slate-400 text-sm mb-2">Total Trades</h3>
              <p className="text-3xl font-bold text-purple-400">
                {stats.totalTrades}
              </p>
            </motion.div>
          </div>

          {isOwner && userData && (
            <AddTradeForm onAdd={handleAddTrade} userId={userData._id} />
          )}

          <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6 shadow-lg mb-20">
            <h2 className="text-xl font-bold text-white mb-6">Trade History</h2>
            <TradeList trades={trades} onDelete={isOwner ? handleDeleteTrade : () => {}} />
          </div>
        </div>
      </div>
    </>
  );
}
