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


export default function Profile() {
  const [view, setView] = useState("list");
  const [selectedButton, setSelectedButton] = useState("user-infomation");
  const [userInforView, setUserInForView] = useState(false);
  const [userAddessView, setUserAddessView] = useState(false);

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
      {userInforView && <Infomation />}
    </>
  );
}
