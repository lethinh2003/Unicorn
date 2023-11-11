"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeaderNavigationItem from "./HeaderNavigationItem";

export default function HeaderNavigation() {
  const [isMenHover, setIsMenHover] = useState(false);
  const [isWomenHover, setIsWomenHover] = useState(false);
  const router = useRouter();
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
          display: { xs: "none", md: "flex" },
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
            <span
              onClick={() => {
                router.push(`${ROUTERS_PATH.HOME_PRODUCT}?gender=men`);
              }}
              className="category-gender-button"
            >
              Nam
            </span>

            <div className="header-men-categories">
              {isMenHover && <HeaderNavigationItem GENDER="men" />}
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
          <span
            onClick={() => {
              router.push(`${ROUTERS_PATH.HOME_PRODUCT}?gender=women`);
            }}
            className="category-gender-button"
          >
            Nữ
          </span>

          <div className="header-women-categories">
            {isWomenHover && <HeaderNavigationItem GENDER="women" />}
          </div>
        </Box>
        <Box
          sx={{
            paddingLeft: "3rem",
            color: "primary.main",
          }}
        >
          Best Seller
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
    </>
  );
}
