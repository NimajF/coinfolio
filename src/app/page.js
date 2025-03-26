"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// export const metadata = {
//   title: "Coinfolio - Home",
//   description: "Coinfolio - The best app fot crypto portfolio tracking",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function Home() {
  useEffect(() => {
    document.title = "Coinfolio - Home";
  }, []);
  return (
    <>
      <div
        style={{
          backgroundColor: "#100f30",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='373' height='373' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%231A184D' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%232C2780'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundAttachment: "fixed",
        }}
        className="-mt-20 p-10 min-h-screen w-full bg-fixed flex flex-col justify-start max-md:justify-center items-center bg-gradient-to-b from-gray-900 via-indigo-900  to-gray-900"
      >
        <header className="mt-20 w-full max-md:flex-col p-6 max-md:p-0 flex self-end justify-evenly max-md:justify-center min-h-screen">
          <div className="w-1/2 max-2xl:w-full">
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-8xl max-md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-800 text-transparent bg-clip-text mt-8"
            >
              Coinfolio
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="mt-4 text-3xl text-slate-200 w-2/4 max-md:w-full"
            >
              Track your favorite cryptocurrencies with{" "}
              <motion.strong
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3, ease: "easeOut" }}
                className="bg-gradient-to-r mb-3 font-semibold from-cyan-200 via-indigo-500 to-zinc-400 bg-clip-text text-transparent underline underline-offset-4"
              >
                real-time data
              </motion.strong>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.3, ease: "easeOut" }}
              className="mt-3 text-slate-200 text-lg w-2/4 max-md:w-full"
            >
              Tracking and managing cryptocurrency investments have never been
              that easy.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.3, ease: "easeOut" }}
              className="mt-5"
            >
              <Link
                href={"/coins"}
                className="text-sm bg-green-500 p-3 rounded-md transition-all duration-150 hover:bg-green-400 max-sm:text-center max-sm:block max-sm:text-xl"
              >
                Get started
              </Link>
            </motion.div>
          </div>
        </header>
        {/* <section>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            className="text-2xl -mb-6 mt-6"
          >
            Wanna start? Give it a chance and search for your coins
          </motion.p>
          <SearchBar />
        </section> */}
      </div>
    </>
  );
}
