import ThemeLayout from "@/components/layouts/ThemeLayout";
import NextAuthProvider from "@/components/providers/NextAuth";
import ReactQueryProvider from "@/components/providers/ReactQuery";
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
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextAuthProvider>
        </ThemeLayout>
      </body>
    </html>
  );
}
export const dynamic = "force-dynamic";
