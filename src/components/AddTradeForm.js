import { useState } from "react";
import { motion } from "framer-motion";

export default function AddTradeForm({ onAdd, userId }) {
  const [formData, setFormData] = useState({
    symbol: "",
    type: "Long",
    entryPrice: "",
    exitPrice: "",
    investment: "",
    pnl: "",
    status: "Win",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, userId });
    setFormData({
      symbol: "",
      type: "Long",
      entryPrice: "",
      exitPrice: "",
      investment: "",
      pnl: "",
      status: "Win",
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6 shadow-lg mb-8"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-bold text-white mb-6">Log New Trade</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Symbol</label>
          <input
            type="text"
            name="symbol"
            placeholder="BTCUSDT"
            value={formData.symbol}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="Long">Long</option>
            <option value="Short">Short</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Entry Price</label>
          <input
            type="number"
            name="entryPrice"
            placeholder="0.00"
            value={formData.entryPrice}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Exit Price</label>
          <input
            type="number"
            name="exitPrice"
            placeholder="0.00"
            value={formData.exitPrice}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Investment</label>
          <input
            type="number"
            name="investment"
            placeholder="0.00"
            value={formData.investment}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">PnL</label>
          <input
            type="number"
            name="pnl"
            placeholder="0.00"
            value={formData.pnl}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
          >
            Add Trade
          </button>
        </div>
      </div>
    </motion.form>
  );
}
