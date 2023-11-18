"use client";
import { useState } from "react";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function HeaderMobileNavigation({ onClick }) {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <Stack>
          <ReorderIcon
            sx={{
              fontSize: "2.5rem",
              cursor: "pointer",
            }}
            onClick={onClick}
          />
        </Stack>
      </Box>
    </>
  );
}
