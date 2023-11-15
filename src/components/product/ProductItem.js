"use client";
import { TYPE_PRODUCT_ITEM_DISPLAY } from "@/configs/config.products";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { ConvertMoney } from "@/utils/convertMoney";
import { Box, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FavoriteButton from "./button/FavoriteButton";

export const ProductItem = ({
  sx,
  product,
  type = TYPE_PRODUCT_ITEM_DISPLAY.DEFAULT,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const { data: dataFavoriteProducts } = useSelector(
    (state) => state.favoriteProducts
  );
  const [productData, setProductData] = useState({
    _id: product._id,
    product_original_price: product.product_original_price,
  });
  const [mainImage, setMainImage] = useState(product.product_images[0]);
  useEffect(() => {
    const checkIsLikedProduct = dataFavoriteProducts.find(
      (item) => item._id.toString() === productData._id.toString()
    );
    setIsLiked(checkIsLikedProduct);
  }, [dataFavoriteProducts, productData]);

  return (
    <>
      <Stack
        className="products-item rounded-lg p-0 shadow duration-150 hover:scale-105 hover:shadow-md"
        sx={{ ...sx, cursor: "default" }}
      >
        <div className="p-4">
          <FavoriteButton
            isFavorited={isLiked}
            productId={productData._id}
            sx={{
              position: "absolute",
              color: "#fff",
              right: 10,
            }}
          />

          <Image
            src={mainImage}
            loader={(props) => imageLoader({ ...props })}
            alt={product.product_name}
            width={320}
            height={320}
            className="product-item-image rounded-lg"
            loading="lazy"
          />
        </div>
        <div
          className="product-details"
          style={{
            gap: "1rem",
            height: "20rem",
          }}
        >
          <Link href={`${ROUTERS_PATH.HOME_PRODUCT}/${productData._id}`}>
            <span
              title={product.product_name}
              className="product-item-name cut-text"
            >
              {product.product_name}
            </span>
          </Link>

          <span className="product-item-price">
            {<ConvertMoney money={productData.product_original_price} />}
          </span>
          <Box
            className="home-product__colors"
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {type !== TYPE_PRODUCT_ITEM_DISPLAY.VIEWED && (
              <div
                onClick={() => {
                  setMainImage(product.product_images[0]);
                  setProductData((prev) => ({
                    ...prev,
                    _id: product._id,
                    product_original_price: product.product_original_price,
                  }));
                }}
                style={{
                  cursor: "pointer",
                  border:
                    productData._id === product._id ? "2px solid" : "1px solid",
                  width: "2rem",
                  height: "2rem",
                  marginRight: "1rem",
                  marginTop: "1rem",
                  backgroundColor: product?.product_color.product_color_code,
                }}
              ></div>
            )}
            {product?.child_products?.map((childProduct) => {
              return (
                <div
                  key={childProduct._id}
                  onClick={() => {
                    setMainImage(childProduct.product_images[0]);
                    setProductData((prev) => ({
                      ...prev,
                      _id: childProduct._id,
                      product_original_price:
                        childProduct.product_original_price,
                    }));
                  }}
                  style={{
                    cursor: "pointer",
                    border:
                      productData._id === childProduct._id
                        ? "2px solid"
                        : "1px solid",
                    width: "2rem",
                    height: "2rem",
                    marginRight: "1rem",
                    marginTop: "1rem",
                    backgroundColor:
                      childProduct?.product_color.product_color_code,
                  }}
                ></div>
              );
            })}
          </Box>
        </div>
      </Stack>
    </>
  );
};

const imageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("width", width.toString());
  return url.href;
};

export const ProductItemLoading = ({ sx }) => {
  return (
    <>
      <Stack
        className="products-item"
        sx={{
          ...sx,
          cursor: "default",

          maxWidth: "30rem",
          width: "100%",
        }}
      >
        <Skeleton
          variant="rectangular"
          height={250}
          sx={{
            width: "100%",
          }}
          className="product-item-image"
        />

        <div
          className="product-details"
          style={{
            gap: "1rem",
            height: "20rem",
          }}
        >
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", height: "7rem" }}
            className="product-item-name cut-text"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", width: "7rem", height: "3rem" }}
            className="product-item-price"
          />

          <Box
            className="home-product__colors"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {Array.from({ length: 5 }).map((_item, i) => (
              <Skeleton key={i} variant="rectangular" width={20} height={20} />
            ))}
          </Box>
        </div>
      </Stack>
    </>
  );
};
