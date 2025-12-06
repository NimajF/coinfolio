import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserPortfolioContext } from "@/contexts/userContext";
import { calculateCoinPnL } from "@/utils/calculateTotalPnL";
import { deleteUserPortfolio } from "@/utils/favoritesHandler";
import { motion } from "framer-motion";

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
    <div className="space-y-6">
      {/* Portfolio Summary */}
      {session && session.user.username === userId && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0a0a15]/40 border border-[#2a2a3e]/50 rounded-xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-slate-400 text-sm">Total Investment</span>
              </div>
              <p className="text-2xl font-bold text-white font-roboto">
                ${portfolio.totalInvestment}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${pnl > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-slate-400 text-sm">Total P&L</span>
              </div>
              <p className={`text-2xl font-bold font-roboto ${pnl > 0 ? "text-green-400" : "text-red-400"}`}>
                {pnl > 0 ? `+$${pnl}` : `$${pnl}`}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-[#2a2a3e]/50">
            <p className="text-slate-500 text-xs mb-2 sm:mb-0">
              Click refresh to update with latest market prices
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                disabled
                  ? "bg-slate-600/50 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
              disabled={disabled}
              onClick={handleRefresh}
            >
              {disabled ? "Refreshing..." : "Refresh"}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Portfolio Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#0a0a15]/60 border-b border-[#2a2a3e]/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Asset</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Holdings</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Current Price</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a3e]/30">
              {portfolio?.coins && portfolio?.coins?.length > 0 ? (
                portfolio?.coins?.map((coin, index) => (
                  <motion.tr
                    key={coin.coinId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className="hover:bg-[#252540]/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/coins/${coin.coinId}`}
                        className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
                      >
                        <img
                          src={coin.coinImage}
                          alt={`${coin.symbol} logo`}
                          className="w-8 h-8 rounded-full border border-[#2a2a3e]/50"
                        />
                        <div>
                          <span className="text-slate-200 font-semibold text-sm">
                            {coin.symbol.toUpperCase()}
                          </span>
                          <p className="text-slate-400 text-xs">
                            {coin.coinId}
                          </p>
                        </div>
                      </Link>
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      <div className="space-y-1">
                        <p className="text-slate-200 font-roboto text-sm">
                          {Number(coin.totalAmount).toFixed(4)}
                        </p>
                        <p className="text-slate-500 text-xs font-roboto">
                          ${coin.totalCoinInversion}
                        </p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      {prices ? (
                        <div className="space-y-1">
                          <p className="text-slate-200 font-roboto text-sm">
                            {prices[coin.coinId]
                              ? `$${prices[coin.coinId].usd.toLocaleString()}`
                              : "N/A"}
                          </p>
                          <p className="text-slate-500 font-roboto text-xs">
                            ${(coin.totalCoinInversion / coin.totalAmount).toFixed(4)} avg
                          </p>
                        </div>
                      ) : (
                        <div className="animate-pulse">
                          <div className="h-4 bg-slate-600/50 rounded w-16 mb-1"></div>
                          <div className="h-3 bg-slate-600/30 rounded w-12"></div>
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      {prices && prices[coin.coinId]?.usd !== undefined ? (
                        <div className={`space-y-1 ${
                          calculateCoinPnL(
                            coin.totalAmount,
                            prices[coin.coinId]?.usd || 0,
                            coin.totalCoinInversion
                          ).pnl < 0
                            ? "text-red-400"
                            : "text-green-400"
                        }`}>
                          <p className="text-sm font-semibold font-roboto">
                            ${calculateCoinPnL(
                              coin.totalAmount,
                              prices[coin.coinId].usd,
                              coin.totalCoinInversion
                            ).pnl}
                          </p>
                          <p className="text-xs">
                            {(((prices[coin.coinId].usd * coin.totalAmount - coin.totalCoinInversion) / coin.totalCoinInversion) * 100).toFixed(2)}%
                          </p>
                        </div>
                      ) : (
                        <div className="animate-pulse">
                          <div className="h-4 bg-slate-600/50 rounded w-12 mb-1"></div>
                          <div className="h-3 bg-slate-600/30 rounded w-8"></div>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-[#2a2a3e]/30 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-400 text-lg font-medium mb-1">No investments yet</p>
                        <p className="text-slate-500 text-sm">Start building your portfolio by adding some coins</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Clear Portfolio Button */}
      {session && session.user.portfolio.coins.length > 0 && session.user.username === userId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors duration-200"
            onClick={() => deleteUserPortfolio(session.user._id)}
          >
            Clear Portfolio
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}