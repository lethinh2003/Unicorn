"use client";
import LoadingBox, { LoadingContent } from "@/components/generals/LoadingBox";
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
export default function Address() {
  const [itemsPerPage, setItemsPerPage] = useState(2 || 10);

  const getListAddresses = async (pageParam) => {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/addresses?page=${pageParam}&itemsOfPage=${itemsPerPage}`
    );
    return results.data;
  };

  const getListQuery = useInfiniteQuery(
    ["get-list-addresses-user"],
    ({ pageParam = 1 }) => getListAddresses(pageParam),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages[pages.length - 1].metadata.results === itemsPerPage) {
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );
  const {
    data: dataAddresses,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = getListQuery;
  useEffect(() => {
    if (isErrorQuery) {
      throw error;
    }
  }, [isErrorQuery]);

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
                  <ItemAddress key={address._id} address={address} />
                ))}
              </Fragment>
            ))}
            {isFetchingNextPage && <LoadingContent />}
            {hasNextPage && !isFetchingNextPage && (
              <Box
                sx={{
                  paddingTop: "10px",
                  textAlign: "center",
                }}
              >
                <Button variant="contained" onClick={() => fetchNextPage()}>
                  Tải thêm
                </Button>
              </Box>
            )}
          </Stack>
        </div>
      </div>
    </>
  );
}

const ItemAddress = ({ address }) => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const handleSetDefaultAddress = async ({ is_default }) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/addresses/update`,
        {
          addressId: address._id,
          provine: address.provine,
          district: address.district,
          ward: address.ward,
          fullName: address.full_name,
          phoneNumber: address.phone_number,
          detailAddress: address.detail_address,
          isDefault: is_default,
        }
      );

      // Update cache react query
      // Invalidate and refetch list address
      await queryClient.invalidateQueries({
        queryKey: ["get-list-addresses-user"],
      });
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteAddress = async ({}) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/addresses/delete`,
        {
          addressId: address._id,
        }
      );

      // Update cache react query
      // Invalidate and refetch list address
      await queryClient.invalidateQueries({
        queryKey: ["get-list-addresses-user"],
      });
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingBox isLoading={isLoading} />}
      <div className="address-item">
        <div className="user-title">
          <span className="user-title-item">Họ và tên</span>
          <span className="user-title-item">Địa chỉ</span>
          <span className="user-title-item">Số điện thoại</span>
        </div>
        <div className="user-desc-value">
          <span className="user-desc-value-item">{address.full_name}</span>
          <span className="user-desc-value-item">
            {address.detail_address}, {address.district}, {address.ward},{" "}
            {address.provine}
          </span>
          <span className="user-desc-value-item">{address.phone_number}</span>
        </div>
        <div className="address-operation">
          <div className="operation-stack">
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleDeleteAddress}
                className="delete-address-button"
              >
                Xóa
              </Button>
              <Button className="edit-address-button">Sửa thông tin</Button>
            </Stack>
            <div>
              <Radio
                checked={address.default}
                onClick={() =>
                  handleSetDefaultAddress({ is_default: !address.default })
                }
              />
              <span>Địa chỉ mặc định</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
