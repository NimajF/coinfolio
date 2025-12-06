"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";

const navigation = [
  { name: "Home", href: "/coins", current: false },
  { name: "Brokers", href: "/exchanges", current: false },
  // { name: "Projects", href: "#", current: false },
  { name: "About", href: "/about", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div
        className="sm:mx-auto z-50 fixed top-0 w-full border-b border-white/10 px-4 sm:px-6 lg:px-8 backdrop-blur-xl bg-opacity-90 shadow-md"
        style={
          pathname === "/"
            ? {
                border: "none",
                backgroundColor: "#14142d35",
                backdropFilter: "blur(20px)",
              }
            : {
                backgroundColor: "rgba(16, 16, 26, 0.85)",
                backdropFilter: "blur(20px)",
              }
        }
      >
        <div className="relative flex h-16 items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <img
              alt="Coinfolio logo"
              onClick={() => router.push("/")}
              src="/images/favicon-32x32.png"
              className="h-8 w-auto cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.href === pathname
                      ? "bg-indigo-600/20 text-indigo-400 border-indigo-400/30"
                      : "text-gray-300 hover:text-indigo-300 hover:bg-white/5 border-transparent",
                    "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 border backdrop-blur-sm"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {session ? (
              <>
                <button
                  onClick={() => signOut()}
                  className="text-gray-300 hover:text-indigo-400 p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                  title="Logout"
                >
                  <CiLogout className="w-5 h-5" />
                </button>
                <Link
                  href={`/user/${session.user.username}`}
                  className="relative rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 p-2.5 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
                  title="Profile"
                >
                  <FaUserLarge className="text-white w-4 h-4" />
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {session && (
              <Link
                href={`/user/${session.user.username}`}
                className="relative rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 p-2 transition-all duration-200"
                title="Profile"
              >
                <FaUserLarge className="text-white w-4 h-4" />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-indigo-400 p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={classNames(
          "md:hidden fixed top-16 left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 z-40",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={classNames(
                item.href === pathname
                  ? "bg-indigo-600/20 text-indigo-400 border-l-4 border-indigo-400"
                  : "text-gray-300 hover:text-indigo-300 hover:bg-white/5 border-l-4 border-transparent",
                "block px-4 py-3 text-base font-medium transition-all duration-200 rounded-r-lg"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Auth Section */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-indigo-300 hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                <CiLogout className="w-5 h-5" />
                <span className="text-base font-medium">Logout</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
