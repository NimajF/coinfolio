"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cards } from "@/constants/aboutCards";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Coinfolio";
  }, []);

  return (
    <div className="text-white min-h-screen">
      <div className="max-w-7xl mx-auto p-8 sm:p-16">
        <motion.p
          className="bg-gradient-to-r mb-3 text-8xl max-sm:text-6xl font-semibold from-cyan-200 via-indigo-500 to-zinc-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          About Coinfolio
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-5 text-2xl text-slate-200 max-md:text-xl"
        >
          Coinfolio is a mobile application designed to help users track and
          manage their cryptocurrency investments in the spot market. With an
          intuitive and user-friendly interface, the app allows users to easily
          add, monitor, and update their holdings in various cryptocurrencies.
          Users can input their buy and sell transactions, view real-time
          prices, and analyze the performance of their portfolio over time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 1,
          }}
          className="p-3 pb-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1 + idx * 0.5,
                duration: 0.8,
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
              style={{ boxShadow: "inset 0 1px 0 0 #ffffff0d" }}
              className="bg-gradient-to-tl from-slate-900 to-indigo-900 bg-opacity-35 p-3 rounded-xl shadow-lg hover:bg-slate-700 cursor-default hover:shadow-indigo-900 text-center transition hover:!scale-105 hover:shadow-2xl duration-300"
            >
              <Image
                src={card.image}
                alt={card.title}
                className="w-full h-32 object-cover rounded-lg border-4 border-transparent mb-2"
                width={500}
                height={150}
              />
              <h2 className="text-xl font-bold text-indigo-400">
                {card.title}
              </h2>
              <p className="text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-4xl mt-10 mb-5 lg:w-1/3 bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-950 p-3 rounded-lg shadow-indigo-950 shadow-xl "
        >
          Why use Coinfolio?
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="text-xl p-4 text-slate-200 border border-gray-800 rounded-md shadow-md"
        >
          {" "}
          Ideal for both beginners and experienced traders, the Spot Portfolio
          Manager simplifies the process of managing your crypto investments in
          the spot market, providing you with all the tools you need to make
          informed decisions and maximize your returns.
        </motion.p>
      </div>
    </div>
  );
}
