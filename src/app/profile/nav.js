"use client";
import { Breadcrumbs, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Infomation from "./infomation";

const ToggleButtons = [
  {
    path: "/profile",
    label: "Tài khoản của tôi",
    value: "user-infomation",
  },
  {
    path: "/profile/address",
    label: "Địa chỉ",
    value: "user-location",
  },
  {
    path: "/profile/tickets",
    label: "Mã giảm giá",
    value: "user-ticket",
  },
  {
    path: "/profile/history",
    label: "Lịch sử đơn hàng",
    value: "user-history",
  },
  {
    path: "/profile/notifications",
    label: "Thông báo",
    value: "user-notification",
  },
];

export default function ProfileNav() {
  const [view, setView] = useState("list");
  const pathName = usePathname();

  return (
    <>
      <div className="container">
        <div className="user-nav-container">
          <div className="user-nav">
            <div className="user-avt-logout">
              <Image
                src="/use-logo.png"
                alt="me"
                width="40"
                height="40"
                className="user-avt"
              ></Image>
              <span className="user-name">Na</span>
              <Button className="logout-button">Đăng xuất</Button>
            </div>
            <div className="nav-infomation">
              <ToggleButtonGroup
                orientation="vertical"
                value={view}
                exclusive
                sx={{ width: "100%" }}
              >
                {ToggleButtons.map((toggle, index) => (
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
                        {toggle.path === "/profile" ? (
                          <AccountCircleOutlinedIcon />
                        ) : toggle.path === "/profile/address" ? (
                          <PersonPinCircleOutlinedIcon />
                        ) : toggle.path === "/profile/tickets" ? (
                          <ConfirmationNumberOutlinedIcon />
                        ) : toggle.path === "/profile/history" ? (
                          <HistoryOutlinedIcon />
                        ) : toggle.path === "/profile/notifications" ? (
                          <NotificationsActiveOutlinedIcon />
                        ) : null}
                        <p className="toggle-button-text">{toggle.label}</p>
                      </div>
                    </ToggleButton>
                  </Link>
                ))}
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
