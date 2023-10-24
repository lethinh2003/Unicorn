"use client";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import Link from "next/link";
import Description from "./Description";
import Infor from "./Infor";
import ListSuggesting from "./ListSuggesting";
import ListViewed from "./ListViewed";
import Review from "./Review";

export default function Home() {
  return (
    <>
      <Container>
        <div className="redirect">
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/">
              <Typography underline="hover" color="inherit">
                Trang chủ
              </Typography>
            </Link>
            <Link href="/products">
              <Typography underline="hover" color="inherit">
                Sản phẩm
              </Typography>
            </Link>
            <Typography color="text.primary">
              Áo thun tay ngắn họa tiết
            </Typography>
          </Breadcrumbs>
        </div>
        <Infor />
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              width: "55%",
            }}
          >
            <ListSuggesting />
          </Box>
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Description />
          </Box>
        </Box>

        <Review />

        <ListViewed />
      </Container>
    </>
  );
}
