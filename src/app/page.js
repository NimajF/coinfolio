"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Plasma from "@/animations/Plasma";

export default function Home() {
  const featureRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const featureInView = useInView(featureRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  useEffect(() => {
    document.title = "Coinfolio - Home";
  }, []);

  return (
    <>
      {/* Header Section with Plasma Background */}
      <header className="relative w-full max-md:flex-col px-64 max-md:p-0 flex self-end justify-evenly max-md:justify-center min-h-screen items-center overflow-hidden">
        {/* Plasma Background - Now covers the entire header for mouse interaction */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Plasma
            color="#5d45fd"
            speed={0.1}
            direction="forward"
            scale={0.7}
            opacity={1}
            mouseInteractive={true}
          />
        </div>
        
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 -z-5" />

        <div className="relative z-0 w-3/4 max-2xl:w-full max-md:text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <div className="text-6xl mb-4">🚀</div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-8xl max-md:text-6xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-500 text-transparent bg-clip-text mt-8 drop-shadow-2xl filter brightness-110"
            style={{
              textShadow: '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.2)'
            }}
          >
            Coinfolio
          </motion.p>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-500 mb-6 max-w-xs max-md:mx-auto rounded-full shadow-lg shadow-purple-500/30"
          />

          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="mt-4 text-3xl text-slate-200 w-2/4 max-md:w-full"
          >
            Track your favorite cryptocurrencies with{" "}
            <motion.strong
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
              className="bg-gradient-to-r mb-3 font-semibold from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent underline underline-offset-4 decoration-2 decoration-blue-400"
            >
              real-time data
            </motion.strong>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.3, ease: "easeOut" }}
            className="mt-6 text-slate-300 text-lg w-2/4 max-md:w-full leading-relaxed"
          >
            A personal interactive portfolio project designed to demonstrate modern web development capabilities in tracking cryptocurrency markets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
            className="mt-8 flex gap-4 max-md:flex-col max-md:items-center"
          >
            <Link
              href={"/coins"}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-xl hover:shadow-2xl hover:shadow-green-500/25 hover:scale-105 transform"
            >
              <span className="relative z-10">Explore Demo</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold text-indigo-300 border-2 border-indigo-500 rounded-full hover:bg-indigo-500/10 transition-all duration-200 cursor-pointer"
              >
                About Project
              </motion.div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-1/4 max-2xl:w-full max-md:mt-10 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="w-64 h-64 max-md:w-48 max-md:h-48 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 border border-blue-400/30"
            />
            <motion.div
              animate={{
                rotate: -360,
                y: [0, -20, 0],
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl"
            >
              ₿
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Smooth transition element */}
      <div className="relative w-full h-32 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950 -mt-1 z-10" />
      
      {/* Rest of the page with enhanced background */}
      <div
        style={{
          backgroundColor: "#090911ff",
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(16, 50, 185, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 10% 80%, rgba(34, 197, 94, 0.06) 0%, transparent 40%),
            linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
          `,
          backgroundSize:
            "100% 100%, 100% 100%, 100% 100%, 100% 100%, 80px 80px, 80px 80px",
          backgroundAttachment: "fixed",
        }}
        className="w-full bg-fixed flex flex-col justify-start items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 -mt-32 pt-32"
      >
        {/* Features Section */}
        <section
          ref={featureRef}
          className="w-full flex flex-col items-center justify-center py-20 px-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={featureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl font-bold text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text mb-4 text-center"
          >
            Project Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={featureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-xl text-slate-300 mb-16 text-center max-w-2xl"
          >
            Exploring the capabilities of Next.js and modern web technologies
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 45 }}
              animate={featureInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="group bg-gradient-to-br from-indigo-900/60 via-indigo-800/40 to-blue-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-indigo-600/40 flex flex-col items-center hover:scale-105 transition-all duration-300 hover:shadow-indigo-500/30 hover:border-indigo-500/50"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-6xl mb-6 filter drop-shadow-lg"
              >
                💹
              </motion.div>
              <h3 className="text-2xl font-bold text-cyan-200 mb-4 text-center">
                Live Market Data
              </h3>
              <p className="text-slate-300 text-center leading-relaxed">
                Integration with real-time cryptocurrency APIs to fetch live prices, market caps, and trading volumes.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 45 }}
              animate={featureInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="group bg-gradient-to-br from-purple-900/60 via-indigo-800/40 to-purple-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-purple-600/40 flex flex-col items-center hover:scale-105 transition-all duration-300 hover:shadow-purple-500/30 hover:border-purple-500/50"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-6xl mb-6 filter drop-shadow-lg"
              >
                📊
              </motion.div>
              <h3 className="text-2xl font-bold text-cyan-200 mb-4 text-center">
                Interactive Charts
              </h3>
              <p className="text-slate-300 text-center leading-relaxed">
                Dynamic visualization of portfolio performance using advanced charting libraries and data analysis.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 45 }}
              animate={featureInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="group bg-gradient-to-br from-blue-900/60 via-indigo-800/40 to-blue-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-blue-600/40 flex flex-col items-center hover:scale-105 transition-all duration-300 hover:shadow-blue-500/30 hover:border-blue-500/50"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-6xl mb-6 filter drop-shadow-lg"
              >
                🔒
              </motion.div>
              <h3 className="text-2xl font-bold text-cyan-200 mb-4 text-center">
                Secure Auth
              </h3>
              <p className="text-slate-300 text-center leading-relaxed">
                Implementation of secure user authentication and protected routes using NextAuth.js.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          ref={statsRef}
          className="w-full flex flex-col items-center justify-center py-20 px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text mb-4">
              Tech Stack & Stats
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Built with modern web technologies
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-5xl font-bold text-green-400 mb-2"
              >
                14+
              </motion.div>
              <p className="text-slate-300 text-lg">Next.js Version</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-5xl font-bold text-blue-400 mb-2"
              >
                100%
              </motion.div>
              <p className="text-slate-300 text-lg">Responsive Design</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-5xl font-bold text-purple-400 mb-2"
              >
                API
              </motion.div>
              <p className="text-slate-300 text-lg">Real-time Integration</p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center justify-center py-20 px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="bg-gradient-to-br from-indigo-900/70 via-purple-900/50 to-blue-900/70 backdrop-blur-md rounded-3xl p-12 max-w-4xl w-full text-center border border-indigo-500/40 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text mb-6"
            >
              Explore the Project
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Dive into the features and functionality of this portfolio project.
              Test the portfolio tracking, analyze market data, and experience the UI.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              className="flex gap-4 justify-center max-md:flex-col max-md:items-center"
            >
              <Link
                href={"/coins"}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl hover:shadow-green-500/40 hover:scale-110 transform"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch Demo
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full py-12 px-6 border-t border-indigo-400/30 mt-20"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text mb-4">
                Coinfolio
              </h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                The most trusted cryptocurrency portfolio tracker. Built for
                investors, by investors.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="text-slate-500 text-sm"
            >
              © 2024 Coinfolio. Built with ❤️ for the crypto community.
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </>
  );
}
