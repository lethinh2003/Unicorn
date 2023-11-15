"use client";
import FavoriteButton from "@/components/product/button/FavoriteButton";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { ConvertMoney } from "@/utils/convertMoney";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const FavoriteItem = ({ product }) => {
  return (
    <>
      <Box
        className="favorite-producs-item"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          position: "relative",
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
              <ConvertMoney money={product.product_original_price} />
            </span>
          </Stack>
        </Box>
        <div className="favorite-control">
          <FavoriteButton productId={product._id} isFavorited={true} />
        </div>
      </Box>
    </>
  );
};
export default FavoriteItem;
export const FavoriteItemLoading = () => {
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
