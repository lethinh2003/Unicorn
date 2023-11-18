"use client";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

const navigationContents = [
  {
    titile: "Doanh thu",
    icon: <AutoGraphOutlinedIcon />,
    path: "/admin",
  },

  {
    titile: "Tài khoản",
    icon: <AccountCircleOutlinedIcon />,
    path: "/admin/users/list",
    listItem: [
      {
        titile: "Danh sách",
        path: "/admin/users/list",
      },
      {
        titile: "Thêm",
        path: "/admin/users/add",
      },
      {
        titile: "Xem",
        path: "/admin/users/view",
      },
      {
        titile: "Sửa",
        path: "/admin/users/edit",
      },
    ],
  },
  {
    titile: "Danh mục",
    icon: <CategoryOutlinedIcon />,
    path: "/admin/categories/list",
    listItem: [
      {
        titile: "Danh sách",
        path: "/admin/categories/list",
      },
      {
        titile: "Thêm",
        path: "/admin/categories/add",
      },
      {
        titile: "Xem",
        path: "/admin/categories/view",
      },
      {
        titile: "Sửa",
        path: "/admin/categories/edit",
      },
    ],
  },
  {
    titile: "Đơn hàng",
    icon: <EventNoteOutlinedIcon />,
    path: "/admin/oders/list",
    listItem: [
      {
        titile: "Danh sách",
        path: "/admin/oders/list",
      },
      {
        titile: "Thêm",
        path: "/admin/oders/add",
      },
      {
        titile: "Xem",
        path: "/admin/oders/view",
      },
      {
        titile: "Sửa",
        path: "/admin/oders/edit",
      },
    ],
  },
  {
    titile: "Sản phẩm",
    icon: <Inventory2OutlinedIcon />,
    path: "/admin/products/list",
    listItem: [
      {
        titile: "Danh sách",
        path: "/admin/products/list",
      },
      {
        titile: "Thêm",
        path: "/admin/products/add",
      },
      {
        titile: "Xem",
        path: "/admin/products/view",
      },
      {
        titile: "Sửa",
        path: "/admin/products/edit",
      },
    ],
  },
  {
    titile: "Mã giảm giá",
    icon: <ConfirmationNumberOutlinedIcon />,
    path: "/admin/vouchers/list",
    listItem: [
      {
        titile: "Danh sách",
        path: "/admin/vouchers/list",
      },
      {
        titile: "Thêm",
        path: "/admin/vouchers/add",
      },
      {
        titile: "Xem",
        path: "/admin/vouchers/view",
      },
      {
        titile: "Sửa",
        path: "/admin/vouchers/edit",
      },
    ],
  },
  {
    titile: "Thông báo",
    icon: <NotificationsActiveOutlinedIcon />,
    path: "/admin/notifications/list",
    listItem: [
      {
        titile: "Danh sách",
        path: "/admin/notifications/list",
      },
      {
        titile: "Thêm",
        path: "/admin/notifications/add",
      },
      {
        titile: "Xem",
        path: "/admin/notifications/view",
      },
      {
        titile: "Sửa",
        path: "/admin/notifications/edit",
      },
    ],
  },
  {
    titile: "Đánh giá",
    icon: <StarOutlineOutlinedIcon />,
    path: "/admin/review/list",
    listItem: [
      {
        titile: "Danh sách",
        path: "/admin/review/list",
      },
      {
        titile: "Thêm",
        path: "/admin/review/add",
      },
      {
        titile: "Xem",
        path: "/admin/review/view",
      },
      {
        titile: "Sửa",
        path: "/admin/review/edit",
      },
    ],
  },
  {
    titile: "Hỗ trợ",
    icon: <SupportAgentOutlinedIcon />,
    path: "/admin/support/list",
    listItem: [
      {
        titile: "Danh sách",
        path: "/admin/support/list",
      },
      {
        titile: "Xem",
        path: "/admin/support/view",
      },
    ],
  },
];

export default function SidebarList() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [index]: !prevOpenItems[index],
    }));
  };
  return (
    <>
      <div className="h-[calc(100%-7rem)] overflow-y-auto">
        <ToggleButtonGroup
          orientation="vertical"
          exclusive
          sx={{ width: "100%", textAlign: "start", overflowY: "auto" }}
        >
          {navigationContents.map((item, index) => (
            <SidebarItem
              index={index}
              toggleItem={toggleItem}
              key={index}
              item={item}
              openItems={openItems}
            />
          ))}
        </ToggleButtonGroup>
      </div>
    </>
  );
}