"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "@/redux/actions/favoriteProducts";
import { ConvertMoney } from "@/utils/convertMoney";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, Skeleton, Stack } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingBox from "../generals/LoadingBox";
export const AllProductItem = ({ sx, product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  const handleClickFavoriteProduct = async ({ type = "like" }) => {
    try {
      if (!isAuthenticated) {
        return router.push(ROUTERS_PATH.SIGN_IN);
      }
      setIsLoading(true);
      let res;
      if (type === "like") {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products`,
          {
            productId: productData._id,
          }
        );
        dispatch(
          addFavoriteProduct({
            product: { _id: productData._id },
          })
        );
      } else if (type === "unlike") {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products/unlike`,
          {
            productId: productData._id,
          }
        );
        dispatch(
          removeFavoriteProduct({
            product: { _id: productData._id },
          })
        );
      }

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
      <Stack className="products-item" sx={{ ...sx, cursor: "default" }}>
        <Checkbox
          checked={!!isLiked}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
          onClick={() =>
            handleClickFavoriteProduct({ type: isLiked ? "unlike" : "like" })
          }
          sx={{
            position: "absolute",
            color: "#fff",
            right: 0,
          }}
        />
        <Image
          src={mainImage}
          alt={product.product_name}
          width={500}
          height={500}
          className="product-item-image"
        />
        <div
          className="product-details"
          style={{
            gap: "1rem",
            height: "20rem",
          }}
        >
          <Link
            href={ROUTERS_PATH.DETAIL_PRODUCT.replace(
              "{productId}",
              productData._id
            )}
          >
            <span
              title={product.product_name}
              className="product-item-name cut-text"
            >
              {product.product_name}
            </span>
          </Link>

          <span className="product-item-price">
            {<ConvertMoney money={productData.product_original_price} />}đ
          </span>
          <Box
            className="home-product__colors"
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
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
                border: "1px solid",
                width: "2rem",
                height: "2rem",
                marginRight: "1rem",
                marginTop: "1rem",
                backgroundColor: product?.product_color.product_color_code,
              }}
            ></div>
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
                    border: "1px solid",
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
export const ViewedProductItem = ({ sx, product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  const handleClickFavoriteProduct = async ({ type = "like" }) => {
    try {
      if (!isAuthenticated) {
        return router.push(ROUTERS_PATH.SIGN_IN);
      }
      setIsLoading(true);
      let res;
      if (type === "like") {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products`,
          {
            productId: productData._id,
          }
        );
        dispatch(
          addFavoriteProduct({
            product: { _id: productData._id },
          })
        );
      } else if (type === "unlike") {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products/unlike`,
          {
            productId: productData._id,
          }
        );
        dispatch(
          removeFavoriteProduct({
            product: { _id: productData._id },
          })
        );
      }

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

      <Stack className="products-item" sx={{ ...sx, cursor: "default" }}>
        <Checkbox
          checked={!!isLiked}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
          onClick={() =>
            handleClickFavoriteProduct({ type: isLiked ? "unlike" : "like" })
          }
          sx={{
            position: "absolute",
            color: "#fff",
            right: 0,
          }}
        />
        <Image
          src={mainImage}
          alt={product.product_name}
          width={500}
          height={500}
          className="product-item-image"
        />
        <div
          className="product-details"
          style={{
            gap: "1rem",
            height: "20rem",
          }}
        >
          <Link
            href={ROUTERS_PATH.DETAIL_PRODUCT.replace(
              "{productId}",
              productData._id
            )}
          >
            <span
              title={product.product_name}
              className="product-item-name cut-text"
            >
              {product.product_name}
            </span>
          </Link>

          <span className="product-item-price">
            {<ConvertMoney money={productData.product_original_price} />}đ
          </span>
          <Box
            className="home-product__colors"
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {product?.relation_products?.map((childProduct) => {
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
                    border: "1px solid",
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
export const SkeletonAllProductItem = ({ sx }) => {
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
