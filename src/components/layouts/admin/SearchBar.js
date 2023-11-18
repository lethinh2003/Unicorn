"use client";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputBase, Stack } from "@mui/material";

const SearchBar = () => {
  return (
    <>
      <div className="admin-layout-search">
        <Stack
          direction="row"
          sx={{
            border: "1px solid #ccc",
            width: "60rem",
            padding: "1rem",
            borderRadius: "4px",
            alignItems: "center",
          }}
        >
          <SearchOutlinedIcon />
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Tìm kiếm" />
        </Stack>
      </div>
    </>
  );
};
export default SearchBar;
