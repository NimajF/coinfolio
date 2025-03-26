"use client";
// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { delay, motion } from "framer-motion";

function Chart({ symbol }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 100, delay: 5 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="w-4/5 max-md:w-full bg-opacity-20 max-md:rounded-none self-center h-[75vh] lg:h-[85vh] p-4 pb-8 bg-slate-800 rounded-lg rounded-tl-none shadow-xl z-0"
    >
      <AdvancedRealTimeChart
        theme="dark"
        autosize
        symbol={`BINANCE:${symbol.toUpperCase()}USDT`}
        locale="en"
        width="100%"
        height="600px"
      />
    </motion.div>
  );
}

export default memo(Chart);
