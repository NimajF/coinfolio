"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { endpoints } from "@/constants/endpoints";
import SelectForApi from "./SelectForApi"; // Asegúrate de tener este importado correctamente
import Link from "next/link";

export default function CoinList() {
  const [data, setData] = useState([]);
  const [endpoint, setEndpoint] = useState("");
  const router = useRouter();

  const handleOption = (endpoint) => {
    setEndpoint(endpoint);
  };

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=10&price_change_percentage=1h%2C24h%2C7d";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COIN_API_KEY,
      },
    };

    fetch(endpoints[endpoint] || url, options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("error:" + err));
  }, [endpoint]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700 text-sm uppercase font-semibold">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-right">Price</th>
            <th className="py-3 px-6 text-right">24h Change</th>
            <th className="py-3 px-6 text-right">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((crypto, index) => (
              <tr
                key={crypto.id}
                onClick={() => router.push(`/coins/${crypto.id}`)}
                className="border-b border-gray-700 hover:bg-gray-900 transition-colors cursor-pointer"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-6 h-6 mr-3"
                  />
                  <span className="font-medium">{crypto.name}</span>
                  <span className="ml-2 text-gray-400 uppercase">
                    {crypto.symbol}
                  </span>
                </td>
                <td className="py-3 px-6 text-right">
                  ${crypto.current_price.toLocaleString()}
                </td>
                <td
                  className={`py-3 px-6 text-right ${
                    crypto.price_change_percentage_24h_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {crypto.price_change_percentage_24h_in_currency.toFixed(2)}%
                </td>
                <td className="py-3 px-6 text-right">
                  ${crypto.market_cap.toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-3 px-6 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
