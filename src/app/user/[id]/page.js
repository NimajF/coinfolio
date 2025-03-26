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

export default function UserPage({ params }) {
  const { data: session } = useSession();
  const { portfolio } = useContext(UserPortfolioContext);
  const { id } = params;
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      document.title =
        id === session.user.username
          ? "My Profile - Coinfolio"
          : `${id}'s Profile`;
    }
  }, [session]);

  return (
    <>
      <Head>
        {" "}
        <title>User {id} | Coinfolio</title>
        <meta name="description" content="Learn more about us." />
      </Head>
      <div className="-mt-5 min-h-svh w-full bg-[#10101a] text-white">
        {visible && (
          <FavoritesModal
            setVisible={setVisible}
            userId={session && session.user._id}
          />
        )}
        <main className="max-w-7xl mx-auto max-sm:p-2 p-6 lg:p-12 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-10">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/3 border border-[#242436] bg-[#171722] p-6 rounded-xl shadow-md"
          >
            {session && session.user.username === id ? (
              <button
                onClick={() => router.push(`/user/${id}/edit`)}
                className="absolute top-5 right-5 bg-indigo-700 text-slate-300 text-lg cursor-pointer rounded-md p-1 hover:text-slate-200 hover:bg-indigo-600"
              >
                <CiEdit />
              </button>
            ) : null}
            <div className="flex flex-col items-center">
              <img
                className="w-36 h-36 rounded-full mb-4"
                src={`https://api.adorable.io/avatars/285/${id}.png`}
                alt="User Avatar"
              />
              <h1 className="text-3xl font-bold text-slate-200">{id}</h1>

              <button
                onClick={() => setVisible(true)}
                className="p-2 self-end text-sm text-slate-200 inline-block rounded-md mt-4 group hover:bg-slate-700 transition-all duration-300"
              >
                My favorites{" "}
                <GoStarFill className="text-yellow-300 inline text-lg transform group-hover:scale-125 transition-transform duration-300" />
              </button>
            </div>

            <div className="mt-2">
              <h2 className="text-lg font-semibold mb-1 text-slate-200">
                About
              </h2>
              <p className="text-gray-300 text-sm">
                User {id} is a passionate cryptocurrency trader and investor.
                They have been active in the market for several years and love
                to share insights.
              </p>
            </div>

            <PortfolioChart portfolio={portfolio} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-2/3 border border-[#242436] bg-[#171722] p-6 rounded-xl shadow-md"
          >
            {session?.user && <UserInversion userId={id} />}
          </motion.section>
        </main>
      </div>
    </>
  );
}
