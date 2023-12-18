"use client";
import EditInformation from "@/components/profile/information/EditInformation";
import EditPassword from "@/components/profile/information/EditPassword";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useGetInformationUser from "@/customHooks/useGetInformationUser";

import { Box, CircularProgress } from "@mui/material";
export default function EditInformationPage() {
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
    {
      title: "Chỉnh sửa thông tin",
      link: `${ROUTERS_PATH.PROFILE}/edit`,
    },
  ];
  return (
    <>
      <div className="user-desc-container divide-y divide-gray-200 rounded-lg drop-shadow-xl">
        <div className="user-desc-header">
          <span className="user-desc-text">Chỉnh sửa thông tin cá nhân</span>
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
            <div
              style={{
                width: "100%",
                display: "flex",
                height: "100%",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <EditInformation
                isLoading={isLoading}
                dataInformation={dataInformation}
              />
              <EditPassword
                isLoading={isLoading}
                dataInformation={dataInformation}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
