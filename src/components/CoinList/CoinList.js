"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SortTable from "./SortTable";
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";

export default function CoinList() {
  const [data, setData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const router = useRouter();

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=20&price_change_percentage=1h%2C24h%2C7d";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COIN_API_KEY,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("error:" + err));
  }, []);

  const handleOption = (option) => {
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
  };

  return (
    <div className="w-4/6 rounded-t-lg max-md:w-full max-lg:w-full max-md:overflow-x-scroll max-md:rounded-t-none">
      <table className="min-w-full bg-opacity-30 text-slate-300 rounded-lg max-md:rounded-t-none">
        <SortTable handleOption={handleOption} />
        <tbody>
          {data && data.length > 0
            ? data.map((crypto, index) => (
                <tr
                  key={crypto.id}
                  onClick={() => router.push(`/coins/${crypto.id}`)}
                  className="text-sm border-b border-[#252531] hover:bg-[#191922] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-6 font-mono">{index + 1}</td>
                  <td className="py-3 px-6 flex items-center">
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="w-6 h-6 mr-3"
                    />
                    <span className="text-gray-200">{crypto.name}</span>
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
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.price_change_percentage_24h.toFixed(2)}%{" "}
                    {crypto.price_change_percentage_24h > 0 ? (
                      <IoTrendingUp className="inline-block ml-1" size={25} />
                    ) : (
                      <IoTrendingDown className="inline-block ml-1" size={25} />
                    )}
                  </td>
                  <td className="py-3 px-6 text-right font-mono">
                    ${crypto.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
