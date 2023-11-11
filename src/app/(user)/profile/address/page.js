"use client";

import LoadMoreButton from "@/components/button/LoadMoreButton";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import { LoadingContent } from "@/components/generals/LoadingBox";
import AddressItem from "@/components/profile/address/AddressItem";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useGetListUserAddresses from "@/customHooks/useGetListUserAddresses";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
export default function Address() {
  const router = useRouter();

  const {
    data: dataAddresses,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListUserAddresses();

  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Địa chỉ",
      link: `${ROUTERS_PATH.PROFILE}/address`,
    },
  ];
  return (
    <>
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>
      <div className="user-desc-container divide-y divide-gray-200 rounded-lg drop-shadow-xl">
        <div className="user-desc-header">
          <h2 className="user-desc-text">Địa chỉ</h2>
          <Button
            onClick={() => router.push("address/new")}
            className="edit-infomation-button"
          >
            Thêm địa chỉ
          </Button>
        </div>
        <div className="user-desc-body ">
          {isLoadingQuery && !isFetchingNextPage && <LoadingContent />}
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {dataAddresses?.pages.map((group, i) => (
              <Fragment key={i}>
                {group.data.map((address) => (
                  <AddressItem key={address._id} address={address} />
                ))}
              </Fragment>
            ))}
            {hasNextPage && (
              <LoadMoreButton
                isLoading={isFetchingNextPage}
                onClick={fetchNextPage}
              />
            )}
          </Stack>
        </div>
      </div>
    </>
  );
}
