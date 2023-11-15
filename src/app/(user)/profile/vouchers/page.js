"use client";
import LoadMoreButton from "@/components/button/LoadMoreButton";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import { LoadingContent } from "@/components/generals/LoadingBox";
import VoucherItem from "@/components/profile/voucher/VoucherItem";
import VoucherItemCopyButton from "@/components/profile/voucher/VoucherItemButton";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useGetListUserVouchers from "@/customHooks/useGetListUserVouchers";
import { Stack } from "@mui/material";

export default function Voucher() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListUserVouchers({ searchValue: "" });
  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Mã giảm giá",
      link: ROUTERS_PATH.PROFILE_VOUCHER,
    },
  ];
  return (
    <>
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>
      <div className="user-voucher-container divide-y divide-gray-200 rounded-lg drop-shadow-xl">
        <div className="user-voucher-header">
          <span className="user-voucher-text">Mã giảm giá</span>
        </div>
        <div className="user-voucher-body">
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            className="w-[100%]"
          >
            {isLoading && !isFetchingNextPage && (
              <div>
                <LoadingContent />
              </div>
            )}

            {data?.map((voucher) => (
              <VoucherItem
                key={voucher._id}
                voucher={voucher}
                button={<VoucherItemCopyButton voucher={voucher} />}
              />
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
