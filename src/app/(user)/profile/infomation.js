"use client";
import useAuth from "@/customHooks/useAuth";
import { convertDate } from "@/utils/convertDate";
import { convertUserGender } from "@/utils/convertGender";
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";
const getInformationUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users`
    );
    const data = response.data.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export default function Infomation() {
  const { isAuthenticated, session } = useAuth();
  const {
    data: dataInformation,
    error,
    isLoading,
    isError,
  } = useQuery(["user-information"], () => getInformationUser());

  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError]);

  const Router = useRouter();
  return (
    <Box
      className="infomation-container"
      sx={{
        flex: 1,
      }}
    >
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
      <Box
        className="user-desc-container"
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <div className="user-desc-header">
          <span className="user-desc-text">Thông tin cá nhân</span>
          <Button
            onClick={() => Router.push("/profile/edit")}
            className="edit-infomation-button"
          >
            Sửa thông tin
          </Button>
        </div>
        <div className="user-desc-body">
          {isLoading && (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <CircularProgress color="inherit" className="loading-progress" />
            </Box>
          )}
          {!isLoading && (
            <>
              <div className="user-title">
                <span className="user-title-item">Họ và tên:</span>
                <span className="user-title-item">Email:</span>
                <span className="user-title-item">Ngày sinh:</span>
                <span className="user-title-item">Giới tính:</span>
                <span className="user-title-item">Số điện thoại:</span>
              </div>
              <div className="user-desc-value">
                <span className="user-desc-value-item">
                  {dataInformation?.name || "Chưa cài đặt"}
                </span>
                <span className="user-desc-value-item">
                  {session?.user?.email || "Chưa cài đặt"}
                </span>
                <span className="user-desc-value-item">
                  {convertDate(dataInformation?.birthday) || "Chưa cài đặt"}
                </span>
                <span className="user-desc-value-item">
                  {convertUserGender(dataInformation?.gender) || "Chưa cài đặt"}
                </span>
                <span className="user-desc-value-item">
                  {dataInformation?.phone_number || "Chưa cài đặt"}
                </span>
              </div>
            </>
          )}
        </div>
      </Box>
    </Box>
  );
}
