"use client";
import useAuth from "@/customHooks/useAuth";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import { Box, Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const IconArray = [
  {
    label: "Tài khoản của tôi",
    path: "/profile",
    icon: <AccountCircleOutlinedIcon />,
    value: "user-infomation",
  },
  {
    label: "Địa chỉ",
    path: "/profile/address",
    icon: <PersonPinCircleOutlinedIcon />,
    value: "user-location",
  },
  {
    label: "Mã giảm giá",
    path: "/profile/vouchers",
    icon: <ConfirmationNumberOutlinedIcon />,
    value: "user-ticket",
  },
  {
    label: "Lịch sử đơn hàng",
    path: "/profile/orders",
    icon: <HistoryOutlinedIcon />,
    value: "user-orders",
  },
  {
    label: "Thông báo",
    path: "/profile/notifies",
    icon: <NotificationsActiveOutlinedIcon />,
    value: "user-notification",
  },
];

export default function ProfileNav() {
  const [view, setView] = useState("list");
  const { session } = useAuth();
  const pathName = usePathname();
  const handleClickSignOut = async () => {
    signOut();
  };

  return (
    <div className="container">
      <Box
        className="user-nav-container"
        sx={{
          width: { xs: "100%", md: "40rem" },
        }}
      >
        <Box
          className="user-nav"
          sx={{
            width: "100%",
          }}
        >
          <div className="user-avt-logout">
            <Image
              src="/icons8-user-48.png"
              alt="me"
              width="40"
              height="40"
              className="user-avt"
            ></Image>
            <span className="user-name">{session?.user?.email}</span>
            <Button className="logout-button" onClick={handleClickSignOut}>
              Đăng xuất
            </Button>
          </div>
          <div className="nav-infomation">
            <ToggleButtonGroup
              orientation="vertical"
              value={view}
              exclusive
              sx={{ width: "100%" }}
            >
              {IconArray.map((toggle, index) => (
                <Link href={toggle.path} key={index}>
                  <ToggleButton
                    value={toggle.value}
                    aria-label="list"
                    sx={{
                      backgroundColor:
                        pathName === toggle.path
                          ? "#C0DED7 !important"
                          : "transparent",
                      borderLeft: "none",
                      borderRight: "none",
                      width: "100%",
                    }}
                  >
                    <div className="nav-toggle-content">
                      {toggle.icon}
                      <p className="toggle-button-text">{toggle.label}</p>
                    </div>
                  </ToggleButton>
                </Link>
              ))}
            </ToggleButtonGroup>
          </div>
        </Box>
      </Box>
    </div>
  );
}
