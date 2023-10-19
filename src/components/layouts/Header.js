"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ProfileOption from "./ProfileOption";
import SearchBarHeader from "./SearchBarHeader";

import { useState } from "react";
const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleShowSearchBar = () => setShowSearchBar(true);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "7rem",
          boxShadow: "2px 2px 2px #dcdbdb",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          justifyContent: "space-between",
          padding: "1rem",
          position: "fixed",
          top: "0",
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Link href={ROUTERS_PATH.HOME_PAGE}>
            <Box
              sx={{
                display: "flex",
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
            </Box>
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "uppercase",
              fontSize: "1.8rem",
              marginTop: "0.5rem",
              gap: "2rem",
              flex: 1,
            }}
          >
            <Box
              sx={{
                paddingLeft: "2rem",
              }}
            >
              Nam
            </Box>
            <Box
              sx={{
                paddingLeft: "3rem",
              }}
            >
              Nữ
            </Box>
            <Box
              sx={{
                paddingLeft: "3rem",
                color: "primary.main",
              }}
            >
              Best Saller
            </Box>
            <Box
              sx={{
                paddingLeft: "3rem",
                color: "primary.main",
              }}
            >
              Sale
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <SearchIcon
              sx={{
                fontSize: "3rem",
                cursor: "pointer",
              }}
              onClick={() => handleShowSearchBar()}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Link href={ROUTERS_PATH.FAVORITE_PRODUCT}>
              <FavoriteBorderIcon
                sx={{
                  fontSize: "2.5rem",
                }}
              ></FavoriteBorderIcon>
            </Link>

            <Link href={ROUTERS_PATH.CART}>
              <ShoppingBagOutlinedIcon
                sx={{
                  fontSize: "2.5rem",
                }}
              ></ShoppingBagOutlinedIcon>
            </Link>

            <ProfileOption />
          </Box>
        </Box>
      </Box>

      <SearchBarHeader
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
      />
    </>
  );
};
export default Header;
