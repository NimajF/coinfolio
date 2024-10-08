"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FavoritesModal from "@/components/FavoritesModal";

export default function UserPage({ params }) {
  const { data: session } = useSession();
  const { id } = params;
  const [visible, setVisible] = useState(false);

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      {visible && (
        <FavoritesModal
          setVisible={setVisible}
          userId={session && session.user._id}
        />
      )}
      <main className="max-w-7xl mx-auto p-6 lg:p-12 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
        <section className="w-full lg:w-1/3 bg-slate-800 p-6 rounded-xl shadow-md">
          <div className="flex flex-col items-center">
            <img
              className="w-36 h-36 rounded-full mb-4"
              src={`https://api.adorable.io/avatars/285/${id}.png`}
              alt="User Avatar"
            />
            <h1 className="text-3xl font-bold">User {id}</h1>
            <p className="text-gray-400 mb-4">user{id}@example.com</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
              Follow
            </button>
          </div>
          <button
            onClick={() => setVisible(true)}
            className="bg-yellow-900 p-2 text-sm rounded-md mt-4 transition-all duration-300 shadow-md hover:bg-yellow-700"
          >
            My favorites <b className="font-light text-yellow-300">⛃⛂⛁⛀</b>
          </button>
          <div className="mt-2">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-300">
              User {id} is a passionate cryptocurrency trader and investor. They
              have been active in the market for several years and love to share
              insights.
            </p>
          </div>
        </section>

        <section className="w-full lg:w-2/3 bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-4">Recent Activity</h2>

          <div className="bg-slate-700 p-4 rounded-lg mb-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">First Post Title</h3>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum vestibulum.
            </p>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg mb-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Second Post Title</h3>
            <p className="text-gray-300">
              Praesent aliquet magna sit amet ligula faucibus, ac feugiat erat
              convallis. Aliquam erat volutpat.
            </p>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Third Post Title</h3>
            <p className="text-gray-300">
              Quisque placerat felis ut risus pellentesque, sed tincidunt elit
              condimentum. Nunc varius sem eget ligula fermentum.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
