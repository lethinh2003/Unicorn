"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HeaderMobileNavigationItem from "./HeaderMobileNavigationItem";

export default function HeaderMobileCategoriesOptions() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100vw" ,backgroundColor:'#fff'}}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Nam" value="1" />
              <Tab label="Nữ" value="2" />
              <Tab label="Best seller" value="#" />
              <Tab label="Sale" value="##" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <HeaderMobileNavigationItem GENDER="men" />
          </TabPanel>
          <TabPanel value="2">
            <HeaderMobileNavigationItem GENDER="women" />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
