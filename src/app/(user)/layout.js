import LoadingBox from "@/components/generals/LoadingBox";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import MainContent from "@/components/layouts/MainContent";

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL),

  title: {
    template: "%s | Unicorn",
    default: "Quần áo thời trang online",
  },
  description: "Quần áo thời trang online",
  applicationName: "Unicorn",
  keywords: [
    "quần áo thời trang",
    "bán quần áo online",
    "thời trang nam/nữ",
    "unicorn",
    "quần áo bền vững",
    "sản phẩm thân thiện với môi trường",
    "đồ thể thao cao cấp",
  ],

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/logo.png",
  },
};

export default async function UserLayout({ children }) {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
      <LoadingBox />
      <Footer />
    </>
  );
}
