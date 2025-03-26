"use client";
import { SessionProvider } from "next-auth/react";
import { UserPortfolioProvider } from "@/contexts/userContext";

export default function Provider({ children }) {
  return (
    <SessionProvider>
      <UserPortfolioProvider>{children}</UserPortfolioProvider>
    </SessionProvider>
  );
}
