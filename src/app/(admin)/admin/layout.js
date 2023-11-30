"use client";
import LoadingBox from "@/components/generals/LoadingBox";
import Header from "@/components/layouts/admin/Header";
import MainContent from "@/components/layouts/admin/MainContent";
import Sidebar from "@/components/layouts/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-layout-right-content min-h-screen w-full max-w-full transition-transform duration-100 ease-linear md:ml-[26.5rem] md:max-w-[calc(100%-26.5rem)]">
        <Header />

        <MainContent>{children}</MainContent>
        <LoadingBox></LoadingBox>
      </div>
    </div>
  );
}
