"use client";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Container,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
} from "@mui/material";
import { useState } from "react";

const clothesNames = [
  "Áo Polo",
  "Quần Jeans",
  "Áo Sơ Mi",
  "Váy Đầm",
  "Áo Hoodie",
  "Áo Len",
  "Quần Short",
  "Áo Thun",
  "Áo Khoác",
  "Quần Dài",
  "Áo Đen",
  "Áo Caro",
  "Quần Áo Thể Thao",
  "Áo Dài",
  "Quần Jogger",
  "Áo Cộc Tay",
  "Váy Ngủ",
  "Quần Legging",
  "Áo Crop Top",
];

let sortClothesNames = clothesNames.sort();

function SearchBarHeader(props) {
  const { showSearchBar, setShowSearchBar } = props;
  const [inputValue, setInputValue] = useState("");

  const handleCloseSearchBar = () => {
    setShowSearchBar(false);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const listAutoComplete = (event) => {
    let filter = event;
    filter = filter.toLowerCase();

    return sortClothesNames.map((item, i) => {
      const text = item;
      const index = text.toLowerCase().indexOf(filter);
      if (index >= 0) {
        return (
          <ListItem disablePadding key={i}>
            <ListItemButton onClick={() => setInputValue(text)}>
              <ListItemText>
                {text.substring(0, index)}
                <span style={{ color: "blue" }}>
                  {text.substring(index, index + filter.length)}
                </span>
                {text.substring(index + filter.length)}
              </ListItemText>
              <ArrowRightAltIcon />
            </ListItemButton>
          </ListItem>
        );
      }
    });
  };

  return (
    <Modal
      open={showSearchBar}
      onClose={() => handleCloseSearchBar()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box
          sx={{
            border: "none",
            outline: "none",
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
          <Container>
            <TextField
              sx={{ width: "100%" }}
              value={inputValue}
              placeholder="Tìm kiếm..."
              onInput={(e) => handleInputChange(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        fontSize: "2.5rem",
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: inputValue && (
                  <InputAdornment
                    onClick={() => setInputValue("")}
                    sx={{ cursor: "pointer" }}
                    position="end"
                  >
                    <CloseIcon
                      sx={{
                        fontSize: "2.5rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Container>
        </Box>
        {inputValue ? (
          <Container
            sx={{
              maxHeight: "40rem",
              overflowY: "auto",
              border: "none",
              outline: "none",
              backgroundColor: "white",
              boxShadow: "1px 0 2px var(--Black-Color)",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              justifyContent: "space-between",
              position: "fixed",
              top: "7rem",
              left: 0,
              right: 0,
              padding: 0,
              "&.MuiContainer-root": {
                padding: 0,
              },
              zIndex: (theme) => theme.zIndex.appBar,
            }}
          >
            <List sx={{ width: "100%", padding: 0 }}>
              {listAutoComplete(inputValue)}
            </List>
          </Container>
        ) : null}
      </>
    </Modal>
  );
}

export default SearchBarHeader;
