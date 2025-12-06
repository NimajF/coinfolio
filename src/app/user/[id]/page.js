"use client";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserPortfolioContext } from "@/contexts/userContext";
import { motion } from "framer-motion";
import FavoritesModal from "@/components/FavoritesModal";
import Head from "next/head";
import PortfolioChart from "@/components/PortfolioChart";
import { GoStarFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import UserInversion from "@/components/UserInversion";
import axios from "axios";

export default function UserPage({ params }) {
  const { data: session } = useSession();
  const { portfolio } = useContext(UserPortfolioContext);
  const { id } = params;
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      document.title =
        id === session.user.username
          ? "My Profile - Coinfolio"
          : `${id}'s Profile`;
    }
  }, [session, id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user?username=${id}`);
        if (res.data.success) {
          setUserData(res.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>User {id} | Coinfolio</title>
        <meta name="description" content="Learn more about us." />
      </Head>
      <div className="-mt-5 min-h-screen w-full bg-gradient-to-br from-[#0a0a15] via-[#12121d] to-[#1a1a2e] text-white relative overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-indigo-500/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl"></div>
        </div>

        {visible && (
          <FavoritesModal
            setVisible={setVisible}
            userId={session && session.user._id}
          />
        )}
        
        <main className="relative z-10 max-w-7xl mx-auto max-sm:p-4 p-6 lg:p-12 flex flex-col lg:flex-row gap-8">
          {/* Profile Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full lg:w-1/3"
          >
            <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-8 shadow-lg relative">
              {/* Edit Button */}
              {session && session.user.username === id && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/user/${id}/edit`)}
                  className="absolute top-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-colors duration-200 shadow-md z-20"
                >
                  <CiEdit className="w-4 h-4" />
                </motion.button>
              )}

              {/* Profile Header */}
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="relative mb-6"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-sm"></div>
                  <img
                    className="relative w-28 h-28 rounded-full border-2 border-[#2a2a3e] shadow-lg object-cover"
                    src={userData?.image || `https://api.adorable.io/avatars/285/${id}.png`}
                    alt="User Avatar"
                  />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  {id}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="text-sm text-slate-400 mb-6"
                >
                  {session?.user.username === id ? "Your Profile" : "Trader Profile"}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisible(true)}
                  className="flex items-center gap-2 bg-[#252540]/60 hover:bg-[#252540]/80 backdrop-blur-sm border border-[#3a3a5c]/50 px-5 py-2.5 rounded-xl transition-all duration-200"
                >
                  <span className="text-slate-200 font-medium">View Favorites</span>
                  <GoStarFill className="text-yellow-400 w-4 h-4" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/user/${id}/trades`)}
                  className="mt-3 flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 backdrop-blur-sm border border-indigo-500/30 px-5 py-2.5 rounded-xl transition-all duration-200"
                >
                  <span className="text-indigo-300 font-medium">Futures Journal</span>
                  <span className="text-indigo-300">📊</span>
                </motion.button>
              </div>

              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mt-8 pt-6 border-t border-[#2a2a3e]/50"
              >
                <h2 className="text-lg font-semibold text-slate-200 mb-3">
                  About
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {userData?.bio || (session?.user.username === id 
                    ? "Welcome to your profile! Track your portfolio performance and manage your favorite cryptocurrencies."
                    : `${id} is an active cryptocurrency trader. Check out their portfolio insights and trading activity.`
                  )}
                </p>
              </motion.div>

              {/* Portfolio Chart */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-8 pt-6 border-t border-[#2a2a3e]/50"
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4">
                  Portfolio Distribution
                </h3>
                <div className="bg-[#0a0a15]/40 border border-[#2a2a3e]/30 rounded-xl p-4">
                  <PortfolioChart portfolio={portfolio} />
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="mt-6 pt-6 border-t border-[#2a2a3e]/50"
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-[#0a0a15]/30 rounded-lg border border-[#2a2a3e]/30">
                    <div className="text-xl font-bold text-white">
                      {portfolio?.length || 0}
                    </div>
                    <div className="text-xs text-slate-400">Assets</div>
                  </div>
                  <div className="text-center p-3 bg-[#0a0a15]/30 rounded-lg border border-[#2a2a3e]/30">
                    <div className="text-xl font-bold text-green-400">
                      +12.5%
                    </div>
                    <div className="text-xs text-slate-400">30d Return</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Portfolio Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            className="w-full lg:w-2/3"
          >
            <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-8 shadow-lg h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Portfolio Overview
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {session?.user.username === id 
                      ? "Track your investment performance"
                      : `${id}'s trading activity`
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    $12,450.30
                  </div>
                  <div className="text-sm text-green-400">
                    +5.2% today
                  </div>
                </div>
              </div>
              
              <div className="border-t border-[#2a2a3e]/50 pt-6">
                {session?.user && <UserInversion userId={id} />}
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </>
  );
}