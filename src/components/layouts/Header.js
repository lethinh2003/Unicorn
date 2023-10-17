"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, TextField, Typography,Stack } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderNavigation from "./HeaderNavigation";
import { useState } from "react";

const Header = () => {
  const [isMenHover, setIsMenHover] = useState(false);
  const [isWomenHover, setIsWomenHover] = useState(false);

  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const handleClickProfileButton = () => {
    if (isAuthenticated) {
      // Redirect to profile page
      router.push(ROUTERS_PATH.PROFILE);
    } else {
      // Redirect to sign in page
      router.push(ROUTERS_PATH.SIGN_IN);
    }
  };

  const handleMenMouseEnter = () => {
    setIsMenHover(true);
  };

  const handleMenMouseLeave = () => {
    setIsMenHover(false);
  };

  const handleWomenMouseEnter = () => {
    setIsWomenHover(true);
  };

  const handleWomenMouseLeave = () => {
    setIsWomenHover(false);
  };

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
                cursor: "pointer",
              }}
              onMouseEnter={handleMenMouseEnter}
              onMouseLeave={handleMenMouseLeave}
            >
              <Stack>
                <span className="category-gender-button">Nam</span>
                <div className="header-men-categories">
                  {isMenHover && <HeaderNavigation GENDER="men" />}
                </div>
              </Stack>
            </Box>
            <Box
              sx={{
                paddingLeft: "3rem",
                cursor: "pointer",
              }}
              onMouseEnter={handleWomenMouseEnter}
              onMouseLeave={handleWomenMouseLeave}
            >
              <span className="category-gender-button">Nữ</span>
              <div className="header-women-categories">
                {isWomenHover && <HeaderNavigation GENDER="women" />}
              </div>
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
          <Box>
            <TextField
              id="seach-input"
              label=""
              placeholder="Tìm kiếm"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
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
            <Box onClick={handleClickProfileButton}>
              <PersonOutlineOutlinedIcon
                sx={{
                  fontSize: "2.5rem",
                  cursor: "pointer",
                }}
              ></PersonOutlineOutlinedIcon>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Header;
