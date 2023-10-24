"use client";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Stack, Typography, TextField, Box, InputBase } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MainContent from "@/components/layouts/MainContent";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigationContents = [
  {
    titile: "Doanh thu",
    icon: <AutoGraphOutlinedIcon />,
    path: "/admin",
  },
  {
    titile: "Tài khoản",
    icon: <AccountCircleOutlinedIcon />,
    path: "/admin/users",
  },
  {
    titile: "Danh mục",
    icon: <CategoryOutlinedIcon />,
    path: "/admin/categories",
  },
  {
    titile: "Đơn hàng",
    icon: <EventNoteOutlinedIcon />,
    path: "/admin/...",
  },
  {
    titile: "Sản phẩm",
    icon: <Inventory2OutlinedIcon />,
    path: "/admin/products",
  },
  {
    titile: "Mã giảm",
    icon: <ConfirmationNumberOutlinedIcon />,
    path: "/admin/vouchers",
  },
  {
    titile: "Thông báo",
    icon: <NotificationsActiveOutlinedIcon />,
    path: "/admin/notifications",
  },
  {
    titile: "Đánh giá",
    icon: <StarOutlineOutlinedIcon />,
    path: "/admin/review",
  },
  {
    titile: "Hỗ trợ",
    icon: <SupportAgentOutlinedIcon />,
    path: "/admin/support",
  },
];

export default function AdminLayout({ children }) {
  const pathName = usePathname();
  return (
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
            <Link href={item.path} key={index}>
              <ToggleButton
                aria-label="list"
                className="admin-layout-nav-button"
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
              </ToggleButton>
            </Link>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className="admin-layout-right-content">
        <div className="admin-layout-header">
          <div className="admin-layout-search">
            <Stack direction='row' sx={{
              border: '1px solid #ccc',
              width:'60rem',
              padding:'1rem',
              borderRadius: '4px',
              alignItems: 'center',
            }}>
              <SearchOutlinedIcon/>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm"
              />
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
  );
}
