"use client";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "black",
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
      ></Box>
    </>
  );
};
export default Header;
