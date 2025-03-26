import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserPortfolioContext } from "@/contexts/userContext";
import { calculateCoinPnL } from "@/utils/calculateTotalPnL";
import { getUser } from "@/utils/favoritesHandler";

export default function UserInversion({ userId }) {
  const { data: session } = useSession();
  const { portfolio, setPortfolio, prices, pnl, refresh, setRefresh } =
    useContext(UserPortfolioContext);
  const [disabled, setDisabled] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };

  return (
    <div className="overflow-x-auto rounded-md pt-1">
      <h2 className="text-xl text-slate-300 mb-4">Cryptocurrency List</h2>
      {session && session.user.username === userId ? (
        <div className="flex flex-1 flex-col mb-4 border-indigo-900 bg-[#09090a] border bg-opacity-40 text-slate-300 text-sm p-3 pl-3 rounded-md shadow-lg">
          <p>
            <strong>Total Investment (USDT): </strong>${" "}
            {portfolio.totalInvestment}
          </p>
          <p>
            <strong>Total PnL: </strong>
            <b className={pnl > 0 ? "text-green-600" : "text-red-500"}>
              {pnl > 0 ? `+ $${pnl}` : `$${pnl}`}
            </b>
          </p>
          <div className="flex flex-row align-baseline justify-end items-end self-end">
            <p className=" text-slate-500 mr-2" style={{ fontSize: "10px" }}>
              {" "}
              click refresh to update new changes
            </p>
            <button
              className={`transition-all duration-300 mt-2 bg-slate-700 text-gray-200 p-1 px-2 rounded-sm hover:bg-indigo-900 ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              style={{ fontSize: "10px" }}
              disabled={disabled}
              onClick={handleRefresh}
            >
              Refresh
            </button>
          </div>
        </div>
      ) : null}
      <table className="min-w-full bg-[#111113] rounded-md">
        <thead>
          <tr className="bg-opacity-100 bg-[#09090a] text-sm max-sm:text-sm/[12px] max-sm:font-light text-slate-200 rounded-md shadow-lg">
            <th className="p-4 text-left">Currency</th>
            <th className="p-4 text-right">Amount | Value</th>
            <th className="p-4 text-right">Last Price | Cost Price</th>
            <th className="p-4 text-right">Position PnL</th>
          </tr>
        </thead>
        <tbody className="text-sm text-slate-300">
          {portfolio?.coins && portfolio?.coins?.length > 0 ? (
            portfolio?.coins?.map((coin) => (
              <tr
                key={coin.coinId}
                className="bg-opacity-50 even:border-slate-800 odd:border-[#25252b] even:border-b odd:border-b hover:bg-slate-800 transition-colors hover:text-slate-300"
              >
                <td className="p-4 flex items-center space-x-2">
                  <Link
                    href={`/coins/${coin.coinId}`}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={coin.coinImage}
                      alt={`${coin.symbol} logo`}
                      className="w-5 h-5"
                    />
                    <span>{coin.symbol.toUpperCase()}</span>
                  </Link>
                </td>
                <td className="p-4 text-right">{coin.totalAmount}</td>
                {prices ? (
                  <td className="p-4 text-right">
                    {prices[coin.coinId]
                      ? `$${prices[coin.coinId].usd}`
                      : "N/A"}
                  </td>
                ) : (
                  <td className="p-4 text-right">Loading...</td>
                )}
                <td
                  className={`p-4 text-right ${
                    prices &&
                    prices[coin.coinId]?.usd !== undefined &&
                    calculateCoinPnL(
                      coin.totalAmount,
                      prices[coin.coinId]?.usd || 0,
                      coin.totalCoinInversion
                    ).pnl < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <span>
                    {prices && prices[coin.coinId]?.usd !== undefined
                      ? `$ ${
                          calculateCoinPnL(
                            coin.totalAmount,
                            prices[coin.coinId].usd,
                            coin.totalCoinInversion
                          ).pnl
                        }`
                      : "N/A"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-slate-300">
                No coins available in your portfolio
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
