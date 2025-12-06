"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  IoRocket,
  IoShield,
  IoTrendingUp,
  IoAnalytics,
  IoWallet,
  IoGlobe,
} from "react-icons/io5";
import { cards, features } from "@/constants/aboutCards";

export default function AboutPage() {
  const featuresRef = useRef(null);
  const missionRef = useRef(null);
  const statsRef = useRef(null);

  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    document.title = "About Coinfolio";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { label: "Active Users", value: "10K+", icon: IoGlobe },
    { label: "Cryptocurrencies", value: "500+", icon: IoWallet },
    { label: "Total Volume", value: "$2M+", icon: IoTrendingUp },
    { label: "Uptime", value: "99.9%", icon: IoShield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a15] to-[#1a1a2e] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 lg:px-12 lg:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/30 mb-6"
            >
              <IoRocket className="w-10 h-10 text-indigo-400" />
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent mb-6">
              About Coinfolio
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "12rem" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8 rounded-full"
            />

            <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Your ultimate tool for tracking and managing cryptocurrency
              investments with
              <span className="text-indigo-400 font-semibold">
                {" "}
                professional-grade analytics
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="relative z-10 px-6 py-16 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold mb-8"
            >
              Project{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
                Concept
              </span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-8 lg:p-12"
            >
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                Coinfolio is a personal portfolio project designed to showcase advanced web development skills. 
                It serves as a comprehensive demonstration of building a full-stack cryptocurrency tracking application, 
                integrating real-time data, secure authentication, and interactive visualizations. 
                This project highlights the ability to create professional-grade user interfaces and robust backend systems.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-4">
                    <IoTrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Stack
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Built with Next.js & Tailwind
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mb-4">
                    <IoShield className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Best Practices
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Clean code & Architecture
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mb-4">
                    <IoRocket className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Performance
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Optimized for speed
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative z-10 px-6 py-16 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center bg-[#1a1a2e]/40 backdrop-blur-sm border border-[#2a2a3e]/50 rounded-2xl p-6 hover:bg-[#1a1a2e]/60 transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative z-10 px-6 py-16 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Key{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
                  Features
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Discover the powerful tools and features implemented in this project
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6 hover:bg-[#1a1a2e]/80 transition-all duration-300 group hover:scale-105"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Portfolio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-6 hover:bg-[#1a1a2e]/80 transition-all duration-300 group hover:scale-105"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <Image
                      src={card.image}
                      alt={card.title}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                      width={500}
                      height={200}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-16 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#1a1a2e]/80 to-[#2a2a3e]/80 backdrop-blur-sm border border-[#3a3a4e] rounded-3xl p-8 lg:p-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent mb-6">
              Explore the Code
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Interested in how this was built? Check out the source code or explore the live demo.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-lg transition-all hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/25"
            >
              <IoRocket className="w-5 h-5" />
              View Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
