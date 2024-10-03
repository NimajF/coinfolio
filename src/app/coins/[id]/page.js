"use client";
import React, { useState, useEffect } from "react";
// import { FontAwesome, Feather } from "react-icons/fa"; // Importa los íconos que necesites
// import AddCoinModal from "./AddCoinModal"; // Tu modal para agregar monedas
export default function CoinPage({ params }) {
  const [coin, setCoin] = useState([]);
  const { id } = params; // Obtén el ID del parámetro de la URL
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleFavorite = () => {
    // Lógica para marcar como favorito
  };

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
      })
      .catch((err) => {
        console.error("error:" + err);
        setLoading(true);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (coin.error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading coin data!</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-gray-900 text-white p-8 min-h-screen">
      {/* <Toast visible={toastVisible} message={message} /> */}
      <img src={coin.image?.small} alt={coin.name} className="w-12 h-12 mb-4" />
      <h1 className="text-3xl font-bold">
        {coin.name} <span className="text-gray-400 font-light">(USD)</span>
      </h1>
      <button
        className="absolute top-8 right-10 text-gray-500"
        onClick={handleFavorite}
      >
        {/* <FontAwesome icon="star-o" size={24} /> */}
      </button>
      <p className="text-lg text-gray-400 uppercase mb-2">{coin.symbol}</p>
      <p className="text-lg">
        Market Cap Rank:{" "}
        <span className="bg-green-500 py-1 px-2 rounded-full font-bold">
          {coin.market_cap_rank}
        </span>
      </p>
      <p className="text-xl mt-2">
        Price:{" "}
        <span
          className={`${
            coin.market_data.price_change_percentage_24h > 0
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          ${coin.market_data.current_price.usd}
        </span>
      </p>
      <p className="text-xl">
        24h Change:{" "}
        <span
          className={`${
            coin.market_data.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {coin.market_data.price_change_percentage_24h.toFixed(2)}%{" "}
          {/* <Feather
            name={
              coin.market_data.price_change_percentage_24h > 0
                ? "trending-up"
                : "trending-down"
            }
            size={18}
            color={
              coin.market_data.price_change_percentage_24h > 0
                ? "#3bb650"
                : "#be4848"
            }
          /> */}
        </span>
      </p>
      <p className="text-xl">
        24h Price Change:{" "}
        <span
          className={`${
            coin.market_data.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {coin.market_data.price_change_24h.toFixed(3)}
        </span>
      </p>
      <p className="text-lg mt-4">
        {coin.description?.en
          ? coin.description.en.split(". ")[0]
          : "No description available."}
      </p>
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-6"
        onClick={() => setModalVisible(true)}
      >
        Add {coin.name}
      </button>
      {/* <AddCoinModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        coin={coin}
        setToastVisible={setToastVisible}
        toastVisible={toastVisible}
        infoAdded={setMessage}
      /> */}
    </div>
  );
}
