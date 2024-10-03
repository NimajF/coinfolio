import CoinList from "@/components/CoinList";
import SelectForApi from "@/components/SelectForApi";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white">
      <header className="w-full text-center p-6">
        <h1 className="text-4xl font-bold">Best of Crypto 🔥</h1>
        <p className="mt-4 text-lg">
          Track your favorite cryptocurrencies with real-time data.
        </p>
      </header>

      <main className="flex flex-col items-center w-full p-6">
        <CoinList />
      </main>

      <footer className="w-full text-center py-6 border-t border-gray-800 mt-auto">
        <p>© 2024 Coinfolio - All Rights Reserved</p>
      </footer>
    </div>
  );
}
