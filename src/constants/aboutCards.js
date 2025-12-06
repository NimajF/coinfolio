import portfolio from "../../public/images/portfolio.jpeg";
import realdata from "../../public/images/realdata.jpg";
import pnl from "../../public/images/pnl.jpg";
import { IoRocket, IoShield, IoTrendingUp, IoAnalytics, IoWallet, IoGlobe } from "react-icons/io5";


export const cards = [
  {
    image: portfolio,
    title: "Portfolio Overview 💼",
    description:
      "Track the total value of your cryptocurrency holdings in real time, with detailed insights into each coin's performance.",
  },
  {
    image: realdata,
    title: "Real-Time Data 📊",
    description:
      "Get up-to-date market data for a wide range of cryptocurrencies, including prices, market capitalization, and volume.",
  },
  {
    image: pnl,
    title: "Profit/Loss Calculation 📈📉",
    description:
      "View your overall profits or losses based on current market prices compared to your entry prices.",
  },
];

export const features = [
    {
      icon: IoAnalytics,
      title: "Real-time Analytics",
      description: "Track your portfolio performance with advanced analytics and insights."
    },
    {
      icon: IoShield,
      title: "Secure Trading",
      description: "Your data and investments are protected with enterprise-level security."
    },
    {
      icon: IoTrendingUp,
      title: "Market Insights",
      description: "Stay informed with real-time market data and price movements."
    },
    {
      icon: IoWallet,
      title: "Portfolio Management",
      description: "Manage multiple portfolios with ease and track your performance."
    },
    {
      icon: IoRocket,
      title: "Easy to Use",
      description: "Intuitive interface designed for both beginners and professionals."
    },
    {
      icon: IoGlobe,
      title: "Global Markets",
      description: "Access to global cryptocurrency markets and exchanges."
    }
  ];