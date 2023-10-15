import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import MainContent from "@/components/layouts/MainContent";
import ThemeLayout from "@/components/layouts/ThemeLayout";
import ReactQueryProvider from "@/components/providers/ReactQuery";

import NextAuthProvider from "@/components/providers/NextAuth";
import "react-toastify/dist/ReactToastify.css";
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
              <Header />
              <MainContent>{children}</MainContent>
              <Footer />
            </ReactQueryProvider>
          </NextAuthProvider>
        </ThemeLayout>
      </body>
    </html>
  );
}
export const dynamic = "force-dynamic";
