"use client";
import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children, session }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      {children}
    </SessionProvider>
  );
};
export default NextAuthProvider;
