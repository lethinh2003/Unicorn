"use client";
import useAuth from "@/customHooks/useAuth";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";

const initInfo = {
  name: "Nguyễn Nhật Anh",
  email: "nhata338@gmail.com",
  birthday: "10/08/2003",
  gender: "Nam",
  phone: "0369569835",
};

export default function Infomation() {
  const { isAuthenticated, session } = useAuth();

  return (
    <div className="infomation-container">
      <div className="redirect-title-container">
        <div className="redirect">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Typography color="text.primary">Hồ sơ</Typography>
          </Breadcrumbs>
        </div>
        <div className="profile-page-header">
          <h1>Thông tin tài khoản</h1>
        </div>
      </div>
      <div className="user-desc-container">
        <div className="user-desc-header">
          <span className="user-desc-text">Thông tin cá nhân</span>
          <Button className="edit-infomation-button">Sửa thông tin</Button>
        </div>
        <div className="user-desc-body">
          <div className="user-title">
            <span className="user-title-item">Họ và tên:</span>
            <span className="user-title-item">Email:</span>
            <span className="user-title-item">Ngày sinh</span>
            <span className="user-title-item">Giới tính</span>
            <span className="user-title-item">Số điện thoại</span>
          </div>
          <div className="user-desc-value">
            <span className="user-desc-value-item">{initInfo.name}</span>
            <span className="user-desc-value-item">{session?.user?.email}</span>
            <span className="user-desc-value-item">{initInfo.birthday}</span>
            <span className="user-desc-value-item">{initInfo.gender}</span>
            <span className="user-desc-value-item">{initInfo.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
