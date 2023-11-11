import ThemeLayout from "@/components/layouts/ThemeLayout";
import NextAuthProvider from "@/components/providers/NextAuth";
import ReactQueryProvider from "@/components/providers/ReactQuery";
import ReduxProvider from "@/components/providers/Redux";
import "react-toastify/dist/ReactToastify.css";

import "./global_taiwind.css";
import "./globals.scss";
export const metadata = {
  title: "Unicorn",
  description: "Unicorn",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeLayout options={{ key: "mui" }}>
          <NextAuthProvider>
            <ReactQueryProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </ReactQueryProvider>
          </NextAuthProvider>
        </ThemeLayout>
      </body>
    </html>
  );
}
export const dynamic = "force-dynamic";
