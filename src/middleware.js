import { withAuth } from "next-auth/middleware";
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) {
          return true;
        }
      },
    },
    pages: {
      signIn: "/sign-in",
      error: "/error",
    },
  }
);

export const config = {
  matcher: ["/profile/:path*", "/cart/payment/:path*"],
};
