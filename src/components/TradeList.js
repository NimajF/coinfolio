import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

export default function TradeList({ trades, onDelete }) {
  if (!trades || trades.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10">
        No trades recorded yet. Start your journal!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-slate-400 border-b border-slate-700/50 text-sm uppercase tracking-wider">
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium">Symbol</th>
            <th className="p-4 font-medium">Type</th>
            <th className="p-4 font-medium">Entry</th>
            <th className="p-4 font-medium">Exit</th>
            <th className="p-4 font-medium">Invested</th>
            <th className="p-4 font-medium">PnL</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <motion.tr
              key={trade._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
            >
              <td className="p-4 text-slate-300">
                {new Date(trade.date).toLocaleDateString()}
              </td>
              <td className="p-4 font-bold text-white">{trade.symbol}</td>
              <td
                className={`p-4 font-medium ${
                  trade.type === "Long" ? "text-green-400" : "text-red-400"
                }`}
              >
                {trade.type}
              </td>
              <td className="p-4 text-slate-300">${trade.entryPrice}</td>
              <td className="p-4 text-slate-300">${trade.exitPrice}</td>
              <td className="p-4 text-slate-300">${trade.investment}</td>
              <td
                className={`p-4 font-bold ${
                  trade.pnl >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {trade.pnl >= 0 ? "+" : ""}
                ${trade.pnl}
              </td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    trade.status === "Win"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {trade.status}
                </span>
              </td>
              <td className="p-4">
                <button
                  onClick={() => onDelete(trade._id)}
                  className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                >
                  <FaTrash />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
