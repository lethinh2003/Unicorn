"use client";
import Header from "@/components/layouts/admin/Header";
import MainContent from "@/components/layouts/admin/MainContent";
import Sidebar from "@/components/layouts/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-layout-right-content ml-[26.5rem] min-h-screen w-full max-w-[calc(100%-26.5rem)]">
        <Header />

        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
