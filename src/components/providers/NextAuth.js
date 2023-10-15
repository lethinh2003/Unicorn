"use client";
import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
};
export default NextAuthProvider;
