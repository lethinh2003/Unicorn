"use client";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Box } from "@mui/material";
export default function HeaderMobileNavigation() {
  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <ReorderIcon
          sx={{
            fontSize: "2.5rem",
            cursor: "pointer",
          }}
        />
      </Box>
    </>
  );
}
