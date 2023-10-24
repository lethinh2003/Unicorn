import Header from "@/components/layouts/admin/Header";
import MainContent from "@/components/layouts/admin/MainContent";
export const metadata = {
  title: "Admin Panel Unicorn",
  description: "Unicorn",
};

export default async function AmdinLayout({ children }) {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
    </>
  );
}
