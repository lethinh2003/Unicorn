"use client";
import MainContent from "@/components/layouts/MainContent";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Collapse, InputBase, Stack, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
    titile: "Mã giảm",
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

export default function AdminLayout({ children }) {
  const pathName = usePathname();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [index]: !prevOpenItems[index],
    }));
  };
  return (
    <div className="admin-container">
      <Stack direction="row" spacing={2} className="admin-layout-container">
        <div className="admin-layout-navigation">
          <Stack
            direction="row"
            sx={{
              width: "100%",
              height: "7rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src="/logo.png" alt="me" width="40" height="40" />
            <Typography
              sx={{
                fontSize: "3rem",
                color: "#FF9EAA",
                fontWeight: "600",
              }}
            >
              Unicorn
            </Typography>
          </Stack>
          <ToggleButtonGroup
            orientation="vertical"
            exclusive
            sx={{ width: "100%", textAlign: "start" }}
          >
            {navigationContents.map((item, index) => (
              <Link href="#" key={index}>
                <ToggleButton
                  aria-label="list"
                  className="admin-layout-nav-button"
                  onClick={() => toggleItem(index)}
                  sx={{
                    width: "100%",
                    border: "none",
                    height: "7rem",
                    justifyContent: "flex-start",
                    paddingLeft: "5rem",
                    backgroundColor: item.path === pathName ? "#38AC8F" : "",
                    color: item.path === pathName ? "#fff" : "",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      textAlign: "start",
                      fontSize: "1.5rem",
                    }}
                  >
                    {item.icon}
                    <span>{item.titile}</span>
                  </Stack>
                  {item.listItem ? (
                    openItems[index] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ToggleButton>
                {item.listItem ? (
                  <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
                    <ToggleButtonGroup
                      sx={{ width: "100%", textAlign: "start" }}
                      orientation="vertical"
                      exclusive
                    >
                      {item.listItem.map((childItem, childIndex) => (
                        <Link
                          key={childIndex}
                          href={childItem.path}
                          sx={{ width: "100%" }}
                        >
                          <ToggleButton
                            aria-label="list"
                            className="admin-layout-nav-button-child"
                            sx={{
                              width: "100%",
                              border: "none",
                              justifyContent: "flex-start",
                              paddingLeft: "6rem",
                              color:
                                childItem.path === pathName ? "#38AC8F" : "",
                            }}
                          >
                            <span style={{ textTransform: "none" }}>
                              {childItem.titile}
                            </span>
                          </ToggleButton>
                        </Link>
                      ))}
                    </ToggleButtonGroup>
                  </Collapse>
                ) : null}
              </Link>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className="admin-layout-right-content">
          <div className="admin-layout-header">
            <div className="admin-layout-search">
              <Stack
                direction="row"
                sx={{
                  border: "1px solid #ccc",
                  width: "60rem",
                  padding: "1rem",
                  borderRadius: "4px",
                  alignItems: "center",
                }}
              >
                <SearchOutlinedIcon />
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Tìm kiếm" />
              </Stack>
            </div>
            <Stack
              direction="row"
              spacing={3}
              className="admin-layout-account-notifi"
            >
              <NotificationsActiveOutlinedIcon sx={{ fontSize: "3rem" }} />
              <Image alt="" src="/avatar.png" width={30} height={30} />
            </Stack>
          </div>
          <MainContent>{children}</MainContent>
        </div>
      </Stack>
    </div>
  );
}
