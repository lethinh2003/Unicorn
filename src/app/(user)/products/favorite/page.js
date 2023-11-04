"use client";
import LoadingBox from "@/components/generals/LoadingBox";
import ROUTERS_PATH from "@/configs/config.routers.path";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "@/redux/actions/favoriteProducts";
import { ConvertMoney } from "@/utils/convertMoney";
import Favorite from "@mui/icons-material/Favorite";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useGetListFavoriteProducts from "./useGetListFavoriteProducts";

export default function FavoriteProducts() {
  const {
    countProducts,
    data: dataProducts,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListFavoriteProducts();

  return (
    <div className="favorite-container">
      <Box>
        <div className="favorite-header">
          <div className="redirect">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Trang chủ
              </Link>
              <Link underline="hover" color="inherit" href="/product">
                Sản phẩm
              </Link>
              <Typography color="text.primary">Sản phẩm yêu thích</Typography>
            </Breadcrumbs>
          </div>
          <div className="favorite-page-header-title">
            <h1>Yêu thích</h1>
          </div>
        </div>

        <div className="favorite-content">
          <div className="favorite-content-header">
            <span className="favorite-products-quantity">
              {countProducts !== 0
                ? countProducts + " sản phẩm"
                : "Không có sản phẩm nào"}
            </span>
          </div>
          <Stack className="favorite-producs">
            {isLoadingQuery && !isFetchingNextPage && (
              <>
                {Array.from({ length: 5 }).map((_item, i) => (
                  <ItemFavoriteProductLoading key={i} />
                ))}
              </>
            )}
            {dataProducts?.pages.map((group, i) => (
              <Fragment key={i}>
                {group.data.map((item) => (
                  <ItemFavoriteProduct
                    key={item._id}
                    product={item.product_id}
                  />
                ))}
              </Fragment>
            ))}
            {isFetchingNextPage && (
              <>
                {Array.from({ length: 5 }).map((_item, i) => (
                  <ItemFavoriteProductLoading key={i} />
                ))}
              </>
            )}
          </Stack>
        </div>
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
      </Box>
    </div>
  );
}

const ItemFavoriteProduct = ({ product }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleClickFavoriteProduct = async ({ type = "like" }) => {
    try {
      setIsLoading(true);
      let res;
      if (type === "like") {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products`,
          {
            productId: product._id,
          }
        );
        dispatch(
          addFavoriteProduct({
            product: { _id: product._id },
          })
        );
      } else if (type === "unlike") {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products/unlike`,
          {
            productId: product._id,
          }
        );
        dispatch(
          removeFavoriteProduct({
            product: { _id: product._id },
          })
        );
      }
      await queryClient.invalidateQueries({
        queryKey: ["get-list-favorite-products"],
      });
      toast.success(res.data.message);
    } catch (err) {
      if (err && err.response) {
        toast.error(`Message: ${err.response?.data?.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingBox isLoading={isLoading} />
      <Box
        className="favorite-producs-item"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", sm: "18.4375rem" },
            }}
          >
            <Image
              src={product.product_images[0]}
              alt={product.product_name}
              width={1000}
              height={200}
              style={{
                width: "100%",
                objectFit: "contain",
                height: "100%",
              }}
            />
          </Box>
          <Stack spacing={2} className="favorite-product-desc">
            <Link
              href={ROUTERS_PATH.DETAIL_PRODUCT.replace(
                "{productId}",
                product._id
              )}
            >
              <Typography
                sx={{
                  fontSize: "2.1875rem",
                  fontStyle: "normal",
                  fontWeight: "700",
                }}
                className="cut-text"
                title={product.product_name}
              >
                {product.product_name}
              </Typography>
            </Link>
            <span className="favorite-product-color">
              Màu sắc: {product.product_color.product_color_name}
            </span>

            <span className="favorite-product-price">
              <ConvertMoney money={product.product_original_price} />đ
            </span>
          </Stack>
        </Box>
        <div className="favorite-control">
          <Checkbox
            checked
            checkedIcon={<Favorite sx={{ color: "#f44336", fontSize: 40 }} />}
            onClick={() => handleClickFavoriteProduct({ type: "unlike" })}
          />
        </div>
      </Box>
    </>
  );
};
const ItemFavoriteProductLoading = () => {
  return (
    <>
      <Box
        className="favorite-producs-item"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            width: "100%",
          }}
        >
          <Skeleton
            variant="rectangular"
            className="favorite-product-image"
            width={163}
            height={163}
          />

          <Stack
            spacing={2}
            className="favorite-product-desc"
            sx={{
              width: "100%",
            }}
          >
            <Skeleton
              variant="text"
              sx={{ fontSize: "2.1875rem", width: "60%" }}
            />
            <Skeleton variant="text" sx={{ fontSize: "2.1875rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2.1875rem" }} />
          </Stack>
        </Box>
        <div className="favorite-control">
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      </Box>
    </>
  );
};
