"use client";
import SidebarHome from "./SidebarHome";
import SidebarList from "./SidebarList";

export default function Sidebar() {
  return (
    <>
      <div className="admin-layout-navigation fixed !w-[25rem] divide-y divide-gray-200 drop-shadow-xl">
        <SidebarHome />
        <SidebarList />
      </div>
    </>
  );
}
