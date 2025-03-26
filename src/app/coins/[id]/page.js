"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import { GoStar, GoStarFill } from "react-icons/go";
import AddCoinModal from "@/components/AddCoinModal";
import AddOldTransactionModal from "@/components/AddOldTransactionModal";
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
  const handleFavorite = () => {};

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
      <div className="h-screen flex flex-col flex-1 justify-center items-center">
        <Spinner />
        <motion.p
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          If you see this message, don't worry, wait for the data fetching
          cooldown!
        </motion.p>
      </div>
    );
  }

  if (coin.error) {
    return (
      <div className="flex justify-center items-center text-center h-screen">
        <div className="border border-slate-700 border-md bg-slate-800 h-50 sm:w-1/2 lg:w-1/4 rounded-md p-5">
          <h1 className="text-5xl mb-5 text-red-500"> Ups! </h1>
          <p className="mb-9 text-slate-400">Error loading coin data!</p>
          <Link
            href="/"
            className="p-2 px-3 bg-blue-500 rounded-md mt-10 w-36 hover:translate-x-2 hover:bg-blue-600"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-8 pt-0 min-h-screen max-md:p-1 max-md:pt-5">
      {toastVisible && <Toast visible={toastVisible} message={message} />}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-4/5 max-lg:w-5/6 max-md:w-full gap-2 bg-opacity-20 max-md:bg-opacity-25 flex flex-row self-center max-md:flex-col p-5 pt-10"
      >
        <div className="w-2/3 max-sm:w-full">
          <div className="mb-1 rounded-md inline-block p-2">
            <img
              src={coin.image?.small}
              alt={coin.name}
              className="w-16 h-16 "
            />
          </div>
          <button
            onClick={handleAddFavorite}
            className="absolute top-16 ml-4 text-lg group"
          >
            {isFavorite ? (
              <GoStarFill className="group-hover:text-yellow-400 text-yellow-400 group-hover:scale-110 text-lg transition-transform duration-200" />
            ) : (
              <GoStar className="group-hover:text-yellow-400 text-slate-400 group-hover:scale-110 text-lg transition-transform duration-200" />
            )}
          </button>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">
              {coin.name}{" "}
              <span className="text-gray-400 font-light">(USD)</span>
            </h1>
            <button
              className="font-semibold bg-transparent border border-green-600  hover:bg-green-500 hover:text-white hover:shadow-md hover:shadow-green-800 text-sm text-green-500 py-2 px-4 rounded-md transition-all"
              onClick={() => setAddModalVisible(true)}
            >
              Add {coin.name}
            </button>
            <button
              className="bg-transparent text-slate-300 text-sm py-2 px-4 rounded-md transition-all"
              onClick={() => setOldTransactionModalVisible(true)}
            >
              Add old {coin.name} transactions
            </button>
          </div>
          <button
            className="absolute top-8 right-10 text-gray-500"
            onClick={handleFavorite}
          ></button>
          <p className="text-md text-gray-400 uppercase">
            {coin.symbol} - <i className="font-sans">{coin.genesis_date}</i>
          </p>
          <p className="text-gray-400 mb-2 text-sm">
            {coin.categories.join(", ")}
          </p>
          <p className="text-lg">
            Market Cap Rank:{" "}
            <span className="bg-green-500 py-1 px-2 rounded-full font-bold">
              {coin.market_cap_rank}
            </span>
          </p>
          <div className="bg-[#181824] p-3 max-w-screen-md w-1/2 max-xl:w-full shadow-lg rounded-md mt-2">
            <p className="text-md text-slate-100">
              Price:{" "}
              <span
                className={`${
                  coin.market_data.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ${coin.market_data.current_price.usd}
              </span>
            </p>
            <p className="text-md text-slate-100">
              24h Change:{" "}
              <span
                className={`${
                  coin.market_data.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%{" "}
                {coin.market_data.price_change_percentage_24h > 0 ? (
                  <IoTrendingUp className="inline-block ml-1" size={25} />
                ) : (
                  <IoTrendingDown className="inline-block ml-1" size={25} />
                )}
              </span>
            </p>
            <p className="text-md text-slate-100">
              24h Price Change:{" "}
              <span
                className={`${
                  coin.market_data.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                $ {coin.market_data.price_change_24h.toFixed(3)}
              </span>
            </p>
          </div>
          <p className="transition-all duration-75 text-md mt-4 text-gray-300 max-md:pt-2 max-md:bg-slate-700 max-md:p-3 rounded-md">
            {coin.description?.en
              ? coin.description.en.split(". ")[0]
              : "No description available."}
          </p>
        </div>
        <div className="bg-[#0b0b0e] bg-opacity-80 p-6 rounded-lg border border-[#1f1f25]  w-full max-w-md mx-auto mt-8">
          <h2 className="text-3xl text-slate-200 font-bold mb-4 text-center">
            Statistics 📋
          </h2>

          <div className="space-y-4 max-md:p-0">
            <div className="flex justify-between items-center border-b border-slate-800 py-2">
              <span className="font-semibold text-gray-400">Market Cap 💰</span>
              <span className="text-sm ">
                ${coin.market_data.market_cap.usd.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-800 py-2">
              <span className="font-semibold text-gray-400">
                24h Volume 🔄{" "}
              </span>
              <span className="text-sm">
                ${coin.market_data.total_volume.usd.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-800 py-2">
              <span className="font-semibold text-gray-400">
                Circulating Supply 🚀
              </span>
              <span className="text-sm">
                {coin.market_data.circulating_supply.toLocaleString()}{" "}
                {coin.symbol.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-800 py-2">
              <span className="font-semibold text-gray-400">
                Total Supply 🔋
              </span>
              <span className="text-sm">
                {coin.market_data.total_supply
                  ? coin.market_data.total_supply.toLocaleString()
                  : "N/A"}{" "}
                {coin.symbol.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-gray-400">Max Supply 🎯</span>
              <span className="text-sm">
                {coin.market_data.max_supply
                  ? coin.market_data.max_supply.toLocaleString()
                  : "N/A"}{" "}
                {coin.symbol.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 100, x: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        transition={{ duration: 2 }}
        className="bg-slate-700 bg-opacity-50 self-start max-w-64 inline-block px-4rounded-t-lg"
      >
        {/* <p className="text-2xl inline">
          {coin.name} Chart <span className="text-2xl">🗠</span>
        </p> */}
      </motion.div>

      <Chart symbol={coin.symbol} />
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
