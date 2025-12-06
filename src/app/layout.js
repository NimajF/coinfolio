import localFont from "next/font/local";
import { Inter, Roboto, Poppins, Nunito, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-secondary",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-accent",
});

export const metadata = {
  title: "Coinfolio",
  description: "Coinfolio - The best app fot crypto portfolio tracking",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${roboto.variable}
          ${poppins.variable}
          ${nunito.variable}
          ${montserrat.variable} antialiased custom-scrollbar min-h-screen flex flex-col bg-gradient-to-tl bg-[#10101a] `} // from-slate-950 via-slate-900 to-indigo-950
      >
        <Provider>
          <Navbar />
          <main>
            <div className="pt-16">{children}</div>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
