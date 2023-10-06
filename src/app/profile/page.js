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
import Address from "./address";
import Infomation from "./infomation";

export default function Home() {
  const [view, setView] = useState("list");
  const [selectedButton, setSelectedButton] = useState("user-infomation");
  const [userInforView, setUserInForView] = useState(false);
  const [userAddessView, setUserAddessView] = useState(false);

  const handleChange = (event, nextView) => {
    if (nextView !== selectedButton) {
      setView(nextView);
      setSelectedButton(nextView);
    }
  };

  useEffect(() => {
    switch (selectedButton) {
      case "user-infomation":
        setUserInForView(true);
        setUserAddessView(false);
        break;
      case "user-location":
        setUserAddessView(true);
        setUserInForView(false);
        break;
      default:
        break;
    }
  }, [selectedButton]);
  console.log(selectedButton);

  return (
    <>
      <div className="container">
        <Container>
          <div className="redirect">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Trang chủ
              </Link>
              <Typography color="text.primary">Hồ sơ</Typography>
            </Breadcrumbs>
          </div>
          <div className="profile-page-header">
            <h1>Thông tin tài khoản</h1>
            <h3>Thông tin cá nhân</h3>
          </div>
          <div className="profile-infomation-container">
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
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                >
                  <ToggleButton
                    value="user-infomation"
                    aria-label="list"
                    sx={{
                      backgroundColor:
                        selectedButton === "user-infomation"
                          ? "#C0DED7 !important"
                          : "transparent",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    <div className="nav-toggle-content">
                      <AccountCircleOutlinedIcon />
                      <p className="toggle-button-text">Tài khoản của tôi</p>
                    </div>
                  </ToggleButton>
                  <ToggleButton
                    value="user-location"
                    aria-label="module"
                    sx={{
                      backgroundColor:
                        selectedButton === "user-location"
                          ? "#C0DED7 !important"
                          : "transparent",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    <div className="nav-toggle-content">
                      <PersonPinCircleOutlinedIcon />
                      <p className="toggle-button-text">Địa chỉ</p>
                    </div>
                  </ToggleButton>
                  <ToggleButton
                    value="user-ticket"
                    aria-label="module"
                    sx={{
                      backgroundColor:
                        selectedButton === "user-ticket"
                          ? "#C0DED7 !important"
                          : "transparent",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    <div className="nav-toggle-content">
                      <ConfirmationNumberOutlinedIcon />
                      <p className="toggle-button-text">Mã giảm giá</p>
                    </div>
                  </ToggleButton>
                  <ToggleButton
                    value="user-history"
                    aria-label="quilt"
                    sx={{
                      backgroundColor:
                        selectedButton === "user-history"
                          ? "#C0DED7 !important"
                          : "transparent",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    <div className="nav-toggle-content">
                      <HistoryOutlinedIcon />
                      <p className="toggle-button-text">Lịch sử đơn hàng</p>
                    </div>
                  </ToggleButton>
                  <ToggleButton
                    value="user-notification"
                    aria-label="quilt"
                    sx={{
                      backgroundColor:
                        selectedButton === "user-notification"
                          ? "#C0DED7 !important"
                          : "transparent",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    <div className="nav-toggle-content">
                      <NotificationsActiveOutlinedIcon />
                      <p className="toggle-button-text">Thông báo</p>
                    </div>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            {userInforView && <Infomation/>}
            {userAddessView && <Address/>}
          </div>
        </Container>
      </div>
    </>
  );
}
