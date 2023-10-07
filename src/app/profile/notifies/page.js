'use client'
import { Stack, Button, Radio, Breadcrumbs,Typography,Link } from "@mui/material";
import { useState } from "react";

const USER_NOTIFIES = [
  {
    title:"DEAL SỐC ĐẾN 50%",
    detail:"Sản phẩm bạn yêu thích đang được giảm giá đến 50%. Vô xem ngay kẻo bỏ lỡ nhé !!!",
  },
  {
    title:"GIAO KIỆN HÀNG THÀNH CÔNG ",
    detail:"Kiện hàng áo thun tay ngắn của bạn đã được giao thành công đến bạn ",
  },
  {
    title:"DEAL SỐC ĐẾN 50%",
    detail:"Sản phẩm bạn yêu thích đang được giảm giá đến 50%. Vô xem ngay kẻo bỏ lỡ nhé !!!",
  },
  {
    title:"DEAL SỐC ĐẾN 50%",
    detail:"Sản phẩm bạn yêu thích đang được giảm giá đến 50%. Vô xem ngay kẻo bỏ lỡ nhé !!!",
  },
];

export default function Notifies() {
  const [notifies, setNotifies] = useState(USER_NOTIFIES);

  const handleSetDefault = (index) => {
    const updatedNotifies = notifies.map((notifies, i) => {
      return {
        ...notifies,
        isDefault: i === index,
      };
    });
    setNotifies(updatedNotifies);
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
            <Typography color="text.primary">Thông báo</Typography>
          </Breadcrumbs>
        </div>
        <div className="profile-page-header">
          <h1>Thông tin tài khoản</h1>
        </div>
      </div>
      <div className="user-notifies-container">
        <div className="user-notifies-header">
          <span className="user-notifies-text">Thông báo</span>
        </div>
        <div className="user-notifies-body">
          <Stack>
          {notifies.map((notifies, index) => (
              <div key={index} className="notifies-item">
                <div className="notifies-body">
                  
                    <div className="notifies_image">
                      <img src="" alt="notifies" />
                    </div>

                    <div className="notifies-infomation">
                      <div className="notifies-title">{notifies.title}</div>
                      <div className="notifies-detail">{notifies.detail}</div>
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
