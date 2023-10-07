'use client'
import { Stack, Button, Radio, Breadcrumbs,Typography,Link } from "@mui/material";
import { useState } from "react";

const USER_ADDRESS = [
  {
    name: "Nguyễn Nhật Anh",
    detail_address: "41 Đội cung",
    provine: "TPHCM",
    district: "Quận 11",
    ward: "Phường 11",
    phone: "0369569835",
    isDefault: true,
  },
  {
    name: "Nguyễn Nhật Anh 2",
    detail_address: "41 Đội cung",
    provine: "TPHCM",
    district: "Quận 11",
    ward: "Phường 11",
    phone: "0369569835",
    isDefault: false,
  },
];

export default function Address() {
  const [addresses, setAddresses] = useState(USER_ADDRESS);

  const handleSetDefault = (index) => {
    const updatedAddresses = addresses.map((address, i) => {
      return {
        ...address,
        isDefault: i === index,
      };
    });
    setAddresses(updatedAddresses);
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
            <Typography color="text.primary">Địa chỉ</Typography>
          </Breadcrumbs>
        </div>
        <div className="profile-page-header">
          <h1>Thông tin tài khoản</h1>
        </div>
      </div>
      <div className="user-desc-container">
        <div className="user-desc-header">
          <span className="user-desc-text">Địa chỉ</span>
          <Button className="edit-infomation-button">Thêm địa chỉ</Button>
        </div>
        <div className="user-desc-body">
          <Stack>
            {addresses.map((address, index) => (
              <div key={index} className="address-item">
                <div className="user-title">
                  <span className="user-title-item">Họ và tên</span>
                  <span className="user-title-item">Địa chỉ</span>
                  <span className="user-title-item">Số điện thoại</span>
                </div>
                <div className="user-desc-value">
                  <span className="user-desc-value-item">{address.name}</span>
                  <span className="user-desc-value-item">
                    {address.detail_address}, {address.district}, {address.ward}
                    , {address.provine}
                  </span>
                  <span className="user-desc-value-item">{address.phone}</span>
                </div>
                <div className="address-operation">
                  <div className="operation-stack">
                    <Stack direction="row" spacing={2}>
                      <Button className="delete-address-button">Xóa</Button>
                      <Button className="edit-address-button">
                        Sửa thông tin
                      </Button>
                    </Stack>
                    <div>
                      <Radio
                        checked={address.isDefault}
                        onChange={() => handleSetDefault(index)}
                      />
                      <span>Địa chỉ mặc định</span>
                    </div>
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
