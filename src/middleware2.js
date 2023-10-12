import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import ROUTERS_PATH from "./configs/config.routers.path";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    if (!token) {
      console.log("hello");
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (req.nextUrl.pathname === ROUTERS_PATH.SIGN_IN) {
      if (token) {
        return NextResponse.redirect(new URL(ROUTERS_PATH.HOME_PAGE, req.url));
      }
    }
    if (req.nextUrl.pathname === ROUTERS_PATH.SIGN_UP) {
      if (token) {
        return NextResponse.redirect(new URL(ROUTERS_PATH.HOME_PAGE, req.url));
      }
    }
    if (req.nextUrl.pathname === ROUTERS_PATH.FORGOT_PASSWORD) {
      if (token) {
        return NextResponse.redirect(
          new URL(ROUTERS_PATH.FORGOT_PASSWORD, req.url)
        );
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token;
      },
    },
  }
);

export const config = {
  matcher: [
    ROUTERS_PATH.SIGN_IN,
    ROUTERS_PATH.SIGN_UP,
    ROUTERS_PATH.FORGOT_PASSWORD,
  ],
};
