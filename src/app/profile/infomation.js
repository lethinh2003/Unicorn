import { Stack, Button } from "@mui/material";

const initInfo = {
  name: "Nguyễn Nhật Anh",
  email: "nhata338@gmail.com",
  birthday: "10/08/2003",
  gender: "Nam",
  phone: "0369569835",
};

export default function Infomation() {
  return (
    <div className="user-desc-container">
      <div className="user-desc-header">
        <span className="user-desc-text">Thông tin cá nhân</span>
        <Button className="edit-infomation-button">Sửa thông tin</Button>
      </div>
      <div className="user-desc-body">
        <div className="infomation">
          <div className="user-title">
            <span className="user-title-item">Họ và tên:</span>
            <span className="user-title-item">Email:</span>
            <span className="user-title-item">Ngày sinh</span>
            <span className="user-title-item">Giới tính</span>
            <span className="user-title-item">Số điện thoại</span>
          </div>
          <div className="user-desc-value">
            <span className="user-desc-value-item">{initInfo.name}</span>
            <span className="user-desc-value-item">{initInfo.email}</span>
            <span className="user-desc-value-item">{initInfo.birthday}</span>
            <span className="user-desc-value-item">{initInfo.gender}</span>
            <span className="user-desc-value-item">{initInfo.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
