"use client";
import { useEffect } from "react";
import ExchangeList from "@/components/ExchangeList";
import { motion } from "framer-motion";

export default function ExchangeListPage() {
  useEffect(() => {
    document.title = "Exchanges - Coinfolio";
  }, []);
  return (
    <div className="pt-10 flex flex-col w-full xl:w-full mx-auto min-h-screen text-white py-8 px-4 ">
      <div className="p-20 self-center max-sm:p-2 xl:w-4/5">
        {/* <img
          src="https://images.unsplash.com/photo-1639754390580-2e7437267698?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Charts"
          className="float-right w-2/5 rounded-xl ml-4 mb-4 shadow-lg opacity-70"
        /> 
        bg-gradient-to-r from-slate-950 via-slate-950 to-indigo-950
        */}

        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-8xl max-sm:text-6xl font-bold text-center mb-7 text-gray-200 bg-gradient-to-r from-cyan-200 via-indigo-500 to-purple-200 bg-clip-text text-transparent"
        >
          Brokers
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="text-lg text-center text-gray-300 mb-5"
        >
          Welcome to our brokers section. Here, you’ll find a carefully curated
          list of trading platforms that allow you to buy, sell, and manage
          cryptocurrencies and other financial assets. Our goal is to help you
          choose the right broker based on your needs, experience, and
          investment goals.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 2, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          className="text-md text-center text-gray-400 mb-7"
        >
          Explore each broker’s key features, including security levels, trading
          incentives, and accessibility. We also provide information about their
          reputation in the industry, as well as their trust and safety scores.
          Click on each broker to learn more details and visit their official
          website.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
          className="text-2xl max-sm:mb-5 text-center font-semibold -mb-5 bg-gradient-to-r from-emerald-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent"
        >
          Start your investment journey and find the perfect broker for you!
        </motion.p>
      </div>

      <div className="w-full flex justify-center -mt-10">
        <div className="self-center p-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ExchangeList />
        </div>
      </div>
    </div>
  );
}
