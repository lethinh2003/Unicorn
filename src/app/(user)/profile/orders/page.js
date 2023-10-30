"use client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Breadcrumbs, Button, Link, Tab, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useState } from "react";

const ORDER_STATUS = [
  {
    label: "Tất cả",
    value: "0",
    type: 0,
  },
  {
    label: "Chờ xác nhận",
    value: "1",
    type: 1,
  },
  {
    label: "Vận chuyển",
    value: "2",
    type: 1,
  },
  {
    label: "Hoàn thành",
    value: "3",
    type: 1,
  },
  {
    label: "Đã hủy",
    value: "4",
    type: 1,
  },
];

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: "600",
    fontSize: "1.5rem",
    marginRight: theme.spacing(1),
    color: theme.palette.common.black,

    "&.Mui-selected": {
      color: "#38ac8f",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#20262d" : "#eaebec",
      borderRadius: "20px",
    },
  })
);

export default function Notifies() {
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="redirect-title-container">
        <div className="redirect">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Link underline="hover" color="inherit" href="/profile">
              Hồ sơ
            </Link>
            <Typography color="text.primary">Lịch sử đơn hàng</Typography>
          </Breadcrumbs>
        </div>
        <div className="profile-page-header">
          <h1>Thông tin tài khoản</h1>
        </div>
      </div>
      <div className="user-notifies-container">
        <div className="user-notifies-header">
          <span className="user-notifies-text">Lịch sử đơn hàng</span>
        </div>
        <div className="user-notifies-body">
          <Box
            sx={{
              width: "100%",

              gap: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              flexWrap: "wrap",
              borderBottom: (theme) =>
                theme.palette.mode === "light"
                  ? "1px solid #dcdee0"
                  : "1px solid #4b4c4e",
            }}
          >
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                sx={{
                  width: "100%",

                  borderBottom: (theme) =>
                    theme.palette.mode === "light"
                      ? "1px solid #dcdee0"
                      : "1px solid #4b4c4e",
                }}
              >
                {ORDER_STATUS.map((item, i) => {
                  return (
                    <StyledTab
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  );
                })}
              </TabList>

              <TabPanel
                sx={{
                  padding: 0,
                  width: "100%",
                }}
                value="0"
              >
                {Array.from({ length: 3 }).map((_item, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: "100%",

                      backgroundColor: "#f6f3f3",
                      display: "flex",
                      padding: "2rem",
                      gap: "1rem",
                      borderBottom: "1px solid #ACA3A3",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "13rem",
                        minWidth: "13rem",
                        height: "13rem",
                        backgroundColor: "white",
                        position: "relative",
                      }}
                    >
                      <Image
                        src="/item_product.png"
                        alt="me"
                        layout="fill"
                        objectFit="contain"
                      />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        gap: "1rem",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                          }}
                        >
                          Áo thun nam ngắn tay
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            color: "#B50B0B",
                          }}
                        >
                          100.000đ
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontWeight: 500,
                          fontSize: "1.7rem",
                        }}
                      >
                        Black/L
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: (theme) => theme.palette.text.secondary,
                            fontWeight: 500,
                            fontSize: "1.7rem",
                          }}
                        >
                          Số lượng 1
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "1rem",
                          }}
                        >
                          <Button>Mua lại</Button>
                          <Button>Đánh giá</Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </TabPanel>

              <TabPanel
                sx={{
                  padding: 0,
                  width: "100%",
                }}
                value="1"
              >
                <Typography>Hello 1</Typography>
              </TabPanel>
              <TabPanel
                sx={{
                  padding: 0,
                  width: "100%",
                }}
                value="2"
              >
                <Typography>Hello 2</Typography>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}
