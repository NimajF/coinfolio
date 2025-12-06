"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { IoTrendingUp, IoTrendingDown, IoArrowBack, IoAdd, IoTime } from "react-icons/io5";
import { GoStar, GoStarFill } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import AddCoinModal from "@/components/AddCoinModal";
import AddOldTransactionModal from "@/components/AddOldTransactionModal";
import SpotOrderCalculator from "@/components/SpotOrderCalculator";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import Chart from "@/components/Chart";
import {
  favoritesHandlerPost,
  favoritesHandlerDelete,
  getUser,
} from "@/utils/favoritesHandler";

export default function CoinPage({ params }) {
  const [coin, setCoin] = useState([]);
  const { data: session, update } = useSession();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [oldTransactionModalVisible, setOldTransactionModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setCoin(json);
        setLoading(false);
        document.title = json.name ? `${json.name} - Coinfolio` : "Coin Error";
      })
      .catch((err) => {
        console.error("error:" + err);
        setLoading(true);
      });
  }, [id]);

  useEffect(() => {
    if (session && coin) {
      const fetchUser = async () => {
        const userResponse = await getUser(session.user._id);
        const hasFavorite = userResponse.data.user.favorites.some(
          (c) => c.coinId === coin.symbol
        );
        setIsFavorite(hasFavorite);
      };
      fetchUser();
    }
  }, [session, coin]);

  const handleAddFavorite = async () => {
    if (!session) return router.push("/register");
    let res;
    if (isFavorite) {
      res = await favoritesHandlerDelete(session.user._id, coin.symbol);
      setIsFavorite(res.success && false);
    } else {
      res = await favoritesHandlerPost(
        session.user._id,
        coin.symbol,
        coin.image?.small
      );
      setIsFavorite(res.success && true);
    }
    if (res.success) {
      await update();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a15] via-[#12121d] to-[#1a1a2e] flex flex-col justify-center items-center">
        <Spinner />
        <motion.p
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="text-slate-400 mt-4 text-center max-w-md"
        >
          Loading coin data... If this takes too long, we might be hitting API rate limits.
        </motion.p>
      </div>
    );
  }

  if (coin.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a15] via-[#12121d] to-[#1a1a2e] flex justify-center items-center">
        <div className="text-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md"
          >
            <h1 className="text-4xl mb-4 text-red-400">Oops!</h1>
            <p className="mb-6 text-slate-400">Error loading coin data!</p>
            <Link
              href="/coins"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl transition-colors"
            >
              <IoArrowBack />
              Back to Markets
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a15] via-[#12121d] to-[#1a1a2e] text-white">
      {toastVisible && <Toast visible={toastVisible} message={message} />}
      
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 px-6 py-8 lg:px-12">
          {/* Navigation */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
            Back
          </motion.button>

          {/* Main Content Layout: 70% Main + 30% Trading Panel */}
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Main Content - 70% */}
            <div className="xl:w-[70%] space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Coin Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={coin.image?.large}
                      alt={coin.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-sm opacity-60" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                        {coin.name}
                      </h1>
                      <button
                        onClick={handleAddFavorite}
                        className="text-xl hover:scale-110 transition-transform"
                      >
                        {isFavorite ? (
                          <GoStarFill className="text-yellow-400" />
                        ) : (
                          <GoStar className="text-slate-400 hover:text-yellow-400" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-400">
                      <span className="text-lg font-roboto uppercase">{coin.symbol}</span>
                      <span className="text-sm">•</span>
                      <span className="text-sm">Rank #{coin.market_cap_rank}</span>
                      {coin.genesis_date && (
                        <>
                          <span className="text-sm">•</span>
                          <span className="text-sm">Since {coin.genesis_date}</span>
                        </>
                      )}
                    </div>
                    
                    {coin.categories && coin.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {coin.categories.slice(0, 3).map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6"
                  >
                    <p className="text-slate-400 text-sm mb-2">Current Price</p>
                    <p className="text-2xl lg:text-3xl font-bold font-roboto">
                      ${coin.market_data?.current_price?.usd?.toLocaleString()}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6"
                  >
                    <p className="text-slate-400 text-sm mb-2">24h Change</p>
                    <div className={`flex items-center gap-2 text-xl font-bold font-roboto ${
                      coin.market_data?.price_change_percentage_24h > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}>
                      <span>
                        {coin.market_data?.price_change_percentage_24h > 0 ? "+" : ""}
                        {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                      {coin.market_data?.price_change_percentage_24h > 0 ? (
                        <IoTrendingUp />
                      ) : (
                        <IoTrendingDown />
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6"
                  >
                    <p className="text-slate-400 text-sm mb-2">24h Volume</p>
                    <p className="text-xl font-bold font-roboto">
                      ${coin.market_data?.total_volume?.usd?.toLocaleString()}
                    </p>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <button
                    onClick={() => setAddModalVisible(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                  >
                    <IoAdd />
                    Add {coin.symbol?.toUpperCase()}
                  </button>
                  
                  <button
                    onClick={() => setOldTransactionModalVisible(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#1a1a2e]/80 border border-[#2a2a3e] hover:bg-[#2a2a3e]/80 rounded-xl font-semibold transition-all"
                  >
                    <IoTime />
                    Add Historical Transaction
                  </button>
                </motion.div>

                {/* Description Section - Moved here after action buttons */}
                {coin.description?.en && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold mb-4">About {coin.name}</h2>
                    <div className="bg-[#1a1a2e]/40 backdrop-blur-sm border border-[#2a2a3e]/50 rounded-2xl p-6">
                      <p className="text-slate-300 leading-relaxed">
                        {coin.description.en.split(". ").slice(0, 3).join(". ")}
                        {coin.description.en.split(". ").length > 3 ? "." : ""}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Trading Panel - 30% */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="xl:w-[30%]"
            >
              <div className="sticky top-24">
                <SpotOrderCalculator coin={coin} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section - Full width */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="px-6 lg:px-12 py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Statistics */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              📊 Market Statistics
            </h3>
            
            <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[#2a2a3e]/50">
                    <span className="text-slate-400">Market Cap</span>
                    <span className="font-mono font-semibold">
                      ${coin.market_data?.market_cap?.usd?.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-[#2a2a3e]/50">
                    <span className="text-slate-400">24h High</span>
                    <span className="font-roboto font-semibold text-green-400">
                      ${coin.market_data?.high_24h?.usd?.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-400">24h Low</span>
                    <span className="font-roboto font-semibold text-red-400">
                      ${coin.market_data?.low_24h?.usd?.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[#2a2a3e]/50">
                    <span className="text-slate-400">Circulating Supply</span>
                    <span className="font-roboto font-semibold">
                      {coin.market_data?.circulating_supply?.toLocaleString()} {coin.symbol?.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-[#2a2a3e]/50">
                    <span className="text-slate-400">Total Supply</span>
                    <span className="font-roboto font-semibold">
                      {coin.market_data?.total_supply 
                        ? coin.market_data.total_supply.toLocaleString()
                        : "N/A"
                      } {coin.symbol?.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-400">Max Supply</span>
                    <span className="font-roboto font-semibold">
                      {coin.market_data?.max_supply 
                        ? coin.market_data.max_supply.toLocaleString()
                        : "∞"
                      } {coin.symbol?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Performance */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              📈 Price Performance
            </h3>
            
            <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">1h</span>
                  <span className={`font-roboto font-semibold ${
                    coin.market_data?.price_change_percentage_1h_in_currency?.usd > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}>
                    {coin.market_data?.price_change_percentage_1h_in_currency?.usd > 0 ? "+" : ""}
                    {coin.market_data?.price_change_percentage_1h_in_currency?.usd?.toFixed(2) || 'N/A'}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">7d</span>
                  <span className={`font-roboto font-semibold ${
                    coin.market_data?.price_change_percentage_7d > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}>
                    {coin.market_data?.price_change_percentage_7d > 0 ? "+" : ""}
                    {coin.market_data?.price_change_percentage_7d?.toFixed(2) || 'N/A'}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">30d</span>
                  <span className={`font-roboto font-semibold ${
                    coin.market_data?.price_change_percentage_30d > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}>
                    {coin.market_data?.price_change_percentage_30d > 0 ? "+" : ""}
                    {coin.market_data?.price_change_percentage_30d?.toFixed(2) || 'N/A'}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">1y</span>
                  <span className={`font-roboto font-semibold ${
                    coin.market_data?.price_change_percentage_1y > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}>
                    {coin.market_data?.price_change_percentage_1y > 0 ? "+" : ""}
                    {coin.market_data?.price_change_percentage_1y?.toFixed(2) || 'N/A'}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Chart Section - Full width */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-6 lg:px-12 py-8"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Price Chart</h2>
          <p className="text-slate-400">Historical price data for {coin.name}</p>
        </div>
        
        <div className="bg-[#1a1a2e]/40 backdrop-blur-sm border border-[#2a2a3e]/50 rounded-2xl p-6">
          <Chart symbol={coin.symbol} />
        </div>
      </motion.section>

      {/* Modals */}
      {addModalVisible && (
        <AddCoinModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
          coin={coin}
          setToastVisible={setToastVisible}
          toastVisible={toastVisible}
          infoAdded={setMessage}
        />
      )}

      {oldTransactionModalVisible && (
        <AddOldTransactionModal
          setModalVisible={setOldTransactionModalVisible}
          coin={coin}
          setToastVisible={setToastVisible}
          toastVisible={toastVisible}
          infoAdded={setMessage}
        />
      )}
    </div>
  );
}