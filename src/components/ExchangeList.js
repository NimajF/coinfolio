"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export default function ExchangeList() {
  const [list, setList] = useState([]);

  const brokersList = useMemo(() => {
    const fetchList = async () => {
      const url = "https://api.coingecko.com/api/v3/exchanges?per_page=50";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COIN_API_KEY,
        },
      };
      const res = await fetch(url, options);
      return res.json();
    };

    fetchList()
      .then(setList)
      .catch((err) => console.error("error:", err));
  }, []);

  return (
    <>
      {list?.length > 0 &&
        list.map((e, idx) => (
          <motion.div
            key={e.name}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1 + idx * 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            style={{ boxShadow: "inset 0 1px 0 0 #ffffff0d" }}
            className="group relative rounded-3xl bg-slate-50 p-6 inset dark:bg-slate-700/20 backdrop-blur-md dark:highlight-white/5 hover:bg-slate-100 dark:hover:bg-slate-700/30 bg-opacity-90"
          >
            <a href={e.url} target="_blank" rel="noopener noreferrer">
              <img
                src={e.image}
                alt={`${e.name} logo`}
                className="w-16 h-16 mx-auto mb-4 rounded-md"
              />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                {e.name}
              </h5>
            </a>

            <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400 text-center">
              <strong>Established: </strong> {e.year_established}
            </p>
            <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400 text-center">
              <strong>Country: </strong> {e.country}
            </p>
            <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400 text-center">
              <strong>Trust Score: </strong>
              <span
                className={`font-bold ${
                  e.trust_score >= 9 ? "text-green-500" : "text-indigo-400"
                }`}
              >
                {e.trust_score}
              </span>{" "}
              (Rank {e.trust_score_rank})
            </p>
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
            >
              Visit Exchange
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </motion.div>
        ))}
    </>
  );
}
