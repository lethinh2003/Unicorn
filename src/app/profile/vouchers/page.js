'use client'
import { Stack, Button, Radio, Breadcrumbs,Typography,Link } from "@mui/material";
import { useState } from "react";

const USER_VOUCHER = [
  {
    percent: "50",
    voucherID: "ANANAN",
    detail_voucher: "Mã Giảm Giá Cho Lần Đầu Đăng Ký Tài Khoản Của Shop UniCorn ",
    expired: "1 ngày",
  },
  {
    percent: "50",
    voucherID: "ANANAN",
    detail_voucher: "Mã Giảm Giá Cho Lần Đầu Đăng Ký Tài Khoản Của Shop UniCorn ",
    expired: "1 ngày",
  },
  {
    percent: "50",
    voucherID: "ANANAN",
    detail_voucher: "Mã Giảm Giá Cho Lần Đầu Đăng Ký Tài Khoản Của Shop UniCorn ",
    expired: "1 ngày",
  },
  
];

export default function Voucher() {
  const [voucher, setVoucher] = useState(USER_VOUCHER);

  const handleSetDefault = (index) => {
    const updatedVoucher = voucher.map((voucher, i) => {
      return {
        ...voucher,
        isDefault: i === index,
      };
    });
    setVoucher(updatedVoucher);
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
          {voucher.map((voucher, index) => (
              <div key={index} className="voucher-item">
                  
                <div className="voucher_image">
                  {/* <img src=".discount_coupon.png" alt="discountIcon" /> */}
                </div>

                <div className="voucher-infomation">
                  <div className="voucher-line">
                    <div className="voucher-percent">Giảm {voucher.percent}%</div>
                    <div className="voucher-id">Mã: {voucher.voucherID}</div>
                  </div>
                  <div className="voucher-detail">{voucher.detail_voucher}</div>
                  <div className="voucher-line">
                    <div className="voucher-expired">Hết hạn sau: {voucher.expired}</div>
                    <button className="voucher-btn-use">Dùng ngay</button>
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
