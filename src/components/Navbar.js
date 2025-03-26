"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FaUserLarge } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

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
  return (
    <div
      className="sm:mx-auto z-10 fixed top-0 w-full border-b border-[#1b1b20] px-2 max-sm:px-0 sm:px-6 lg:px-8 backdrop-blur-lg bg-opacity-80 shadow-sm"
      style={
        pathname === "/"
          ? { border: "none", backgroundColor: "rgba(31, 65, 143, 0.082)" }
          : { backgroundColor: "#10101a" }
      }
    >
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center"></div>

        <div className="flex flex-1 items-center justify-center max-sm:justify-start  max-sm:ml-2 sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img
              alt="Coinfolio logo"
              onClick={() => router.push("/")}
              src="/images/favicon-32x32.png"
              className="h-8 w-auto cursor-pointer hover:scale-125 transition max-sm:mr-4 max-sm:ml-1"
            />
          </div>
          <div className="sm:ml-6 sm:block">
            <div className="flex space-x-4 max-md:space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.href === pathname
                      ? "bg-indigo-700 text-indigo-500"
                      : "text-gray-300 hover:text-indigo-400",
                    "rounded-md px-3 py-2 transition-all duration-100 text-sm text-slate-200"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* <SearchBar /> */}
        </div>

        <div className="flex items-center">
          {session ? (
            <>
              <button
                onClick={() => signOut()}
                className="mr-3 text-lg font-bold text-gray-200 hover:text-indigo-500"
              >
                <CiLogout />
              </button>
              <Link
                href={`/user/${session.user.username}`}
                className="relative rounded-full text-sm  max-sm:mr-10 bg-indigo-600 hover:bg-indigo-700 p-2 hover:text-white focus:outline-none shadow-lg"
              >
                <FaUserLarge className="text-white" />
              </Link>
            </>
          ) : (
            <Link
              href={"/login"}
              className="relative mr-5 rounded-md text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 w-16 text-center p-2 hover:text-white focus:outline-none"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
