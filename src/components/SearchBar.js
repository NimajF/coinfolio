"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirigir a la página de la moneda basada en el término de búsqueda
      router.push(`/coins/${searchTerm.trim().toLowerCase()}`);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.1, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="max-w-2xl w-1/2 mx-auto mt-10 transition-all duration-500 focus:shadow-sky-800 shadow-xl max-md:w-3/4"
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block focus:shadow-indigo-900 shadow-md focus:outline-none w-full p-4 ps-10 text-md font-mono text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#121216] dark:border-[#2b2b33] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 light:focus:border-blue-500 dark:focus:border-indigo-600 transition-all duration-150 hover:border-slate-500 hover:shadow-lg hover:shadow-indigo-900"
          placeholder="Search coins 💎"
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </motion.form>
  );
}
