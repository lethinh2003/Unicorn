"use client";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { convertDate } from "@/utils/convertDate";
import { convertUserGender } from "@/utils/convertGender";
import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

import useGetInformationUser from "@/customHooks/useGetInformationUser";

export default function InfomationPage() {
  const router = useRouter();
  const { data: dataInformation, isLoading } = useGetInformationUser();

  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Thông tin cá nhân",
      link: ROUTERS_PATH.PROFILE,
    },
  ];
  const INFORMATION_CONTENT = [
    {
      title: "Họ và tên:",
      value: dataInformation?.name || "Chưa cài đặt",
    },
    {
      title: "Email:",
      value: dataInformation?.email || "Chưa cài đặt",
    },
    {
      title: "Ngày sinh:",
      value: convertDate(dataInformation?.birthday) || "Chưa cài đặt",
    },
    {
      title: "Giới tính:",
      value: convertUserGender(dataInformation?.gender) || "Chưa cài đặt",
    },
    {
      title: "Số điện thoại:",
      value: dataInformation?.phone_number || "Chưa cài đặt",
    },
  ];

  return (
    <Box
      className="infomation-container "
      sx={{
        flex: 1,
        maxWidth: { xs: "100%", md: "calc(100% - 40rem)" },
      }}
    >
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>
      <Box
        className="user-desc-container divide-y divide-gray-200 rounded-lg drop-shadow-xl"
        sx={{
          flex: 1,
          width: "100%",
        }}
      >
        <div className="user-desc-header">
          <h2 className="user-desc-text">Thông tin cá nhân</h2>
          <Button
            onClick={() => router.push(`${ROUTERS_PATH.PROFILE}/edit`)}
            className="edit-infomation-button drop-shadow-lg"
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
              <div className="flex w-full flex-col">
                {INFORMATION_CONTENT.map((item) => (
                  <div key={item.title} className="flex">
                    <span className="user-title-item min-w-[15rem] max-w-[15rem] ">
                      {item.title}
                    </span>
                    <span className="user-desc-value-item max-w-[calc(100%-15rem)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Box>
    </Box>
  );
}
