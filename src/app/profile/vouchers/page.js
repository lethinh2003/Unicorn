"use client";
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
const USER_VOUCHER = [
  {
    percent: "30",
    voucherID: "ANANAN",
    detail_voucher:
      "Mã Giảm Giá Cho Lần Đầu Đăng Ký Tài Khoản Của Shop UniCorn ",
    expired: "1 ngày",
  },
  {
    percent: "70",
    voucherID: "ANANAN",
    detail_voucher:
      "Mã Giảm Giá Cho Lần Đầu Đăng Ký Tài Khoản Của Shop UniCorn ",
    expired: "1 ngày",
  },
  {
    percent: "20",
    voucherID: "ANANAN",
    detail_voucher:
      "Mã Giảm Giá Cho Lần Đầu Đăng Ký Tài Khoản Của Shop UniCorn ",
    expired: "1 ngày",
  },
  {
    percent: "50",
    voucherID: "ANANAN",
    detail_voucher:
      "Mã Giảm Giá Cho Lần Đầu Đăng Ký Tài Khoản Của Shop UniCorn ",
    expired: "1 ngày",
  },
  {
    percent: "70",
    voucherID: "ANANAN",
    detail_voucher:
      "Mã Giảm Giá Cho Lần Đầu Đăng Ký Tài Khoản Của Shop UniCorn ",
    expired: "1 ngày",
  },
];

export default function Voucher() {
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
            <Typography color="text.primary">Mã giảm giá</Typography>
          </Breadcrumbs>
        </div>
        <div className="profile-page-header">
          <h1>Thông tin tài khoản</h1>
        </div>
      </div>
      <div className="user-voucher-container">
        <div className="user-voucher-header">
          <span className="user-voucher-text">Mã giảm giá</span>
        </div>
        <div className="user-voucher-body">
          <Stack>
            {USER_VOUCHER.map((voucher, index) => (
              <div key={index} className="voucher-item">
                <Box className="voucher_image">
                  <Box
                    sx={{
                      maxWidth: "5rem",
                      minWidth: "5rem",
                      margin: "0 auto",
                      position: "relative",
                    }}
                  >
                    <Image
                      src="/voucher_icon.png"
                      alt="me"
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                </Box>

                <div className="voucher-infomation">
                  <div className="voucher-line">
                    <div className="voucher-percent">
                      Giảm {voucher.percent}%
                    </div>
                    <div className="voucher-id">Mã: {voucher.voucherID}</div>
                  </div>
                  <div className="voucher-detail">{voucher.detail_voucher}</div>
                  <div className="voucher-line">
                    <div className="voucher-expired">
                      Hết hạn sau: {voucher.expired}
                    </div>
                    <Button>Dùng ngay</Button>
                  </div>
                </div>
              </div>
            ))}
          </Stack>
        </div>
      </div>
    </>
  );
}
