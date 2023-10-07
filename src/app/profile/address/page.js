import { Stack, Button, Radio } from "@mui/material";

const initAddress = {
  name: "Nguyễn Nhật Anh",
  detail_address: "41 Đội cung",
  provine: "TPHCM",
  district: "Quận 11",
  ward: "Phường 11",
  phone: "0369569835",
};

export default function Address() {
  return (
    <div className="user-desc-container">
      <div className="user-desc-header">
        <span className="user-desc-text">Địa chỉ</span>
        <Button className="edit-infomation-button">Thêm địa chỉ</Button>
      </div>
      <div className="user-desc-body">
        <Stack>
          <div className="address-item">
            <div className="user-title">
              <span className="user-title-item">Họ và tên</span>
              <span className="user-title-item">Địa chỉ</span>
              <span className="user-title-item">Số điện thoại</span>
            </div>
            <div className="user-desc-value">
              <span className="user-desc-value-item">{initAddress.name}</span>
              <span className="user-desc-value-item">
                {initAddress.detail_address},{initAddress.district},
                {initAddress.ward},{initAddress.provine}
              </span>
              <span className="user-desc-value-item">{initAddress.phone}</span>
            </div>
            <div className="address-operation">
              <div className="operation-stack">
                <Stack direction="row" spacing={2}>
                  <Button className="delete-address-button">Xóa</Button>
                  <Button className="edit-address-button">Sửa thông tin</Button>
                </Stack>
                <div>
                  <Radio />
                  <span>Địa chỉ mặc định</span>
                </div>
              </div>
            </div>
          </div>
          <div className="address-item">
            <div className="user-title">
              <span className="user-title-item">Họ và tên</span>
              <span className="user-title-item">Địa chỉ</span>
              <span className="user-title-item">Số điện thoại</span>
            </div>
            <div className="user-desc-value">
              <span className="user-desc-value-item">{initAddress.name}</span>
              <span className="user-desc-value-item">
                {initAddress.detail_address},{initAddress.district},
                {initAddress.ward},{initAddress.provine}
              </span>
              <span className="user-desc-value-item">{initAddress.phone}</span>
            </div>
            <div className="address-operation">
              <div className="operation-stack">
                <Stack direction="row" spacing={2}>
                  <Button className="delete-address-button">Xóa</Button>
                  <Button className="edit-address-button">Sửa thông tin</Button>
                </Stack>
                <div>
                  <Radio />
                  <span>Địa chỉ mặc định</span>
                </div>
              </div>
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
}
