"use client";
import { Box } from "@mui/material";
import { useEffect } from "react";

const HomeLayout = ({ children }) => {
  useEffect(() => {
    console.log("re-render home layout");
  }, []);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "pink",
          height: "5rem",
          width: "100vw",
        }}
      >
        Home navigation
        {children}
      </Box>
    </>
  );
};
export default HomeLayout;
