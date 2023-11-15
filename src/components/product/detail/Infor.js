"use client";
import useAuth from "@/customHooks/useAuth";
import { ConvertMoney } from "@/utils/convertMoney";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import FavoriteProduct from "./FavoriteProduct";

import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { addViewedProduct } from "@/redux/actions/viewedProducts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import InforColor from "./InforColor";
import InforImage from "./InforImage";
import InforQuantity from "./InforQuantity";
import InforSize from "./InforSize";
export default function Infor({ dataProduct }) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Add to List Viewed
    dispatch(
      addViewedProduct({
        product: dataProduct,
      })
    );
  }, []);

  const [productData, setProductData] = useState({
    stockSizeQuantities: dataProduct.product_sizes[0].size_quantities,
    quantity: 1,
    color: dataProduct.product_color.product_color_code,
    size: dataProduct.product_sizes[0].size_type.product_size_name,
    sizeId: dataProduct.product_sizes[0].size_type._id,
  });
  const [isAvailableProduct, setIsAvailableProduct] = useState(
    productData.stockSizeQuantities >= productData.quantity
  );
  const [activeImage, setActiveImage] = useState(
    "https://i.imgur.com/yLTbVSD.png"
  );
  useEffect(() => {
    setIsAvailableProduct(
      productData.stockSizeQuantities >= productData.quantity
    );
    if (!productData.quantity) {
      setIsAvailableProduct(false);
    }
  }, [productData]);

  useEffect(() => {
    if (dataProduct) {
      if (dataProduct.product_images.length > 0) {
        setActiveImage(dataProduct?.product_images[0]);
      }
    }
  }, [dataProduct]);

  const addProductToCart = async ({
    productId,
    productQuantities,
    productSize,
  }) => {
    const results = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/carts/cart-items`,
      {
        productId,
        productQuantities,
        productSize,
      }
    );
    return results.data;
  };
  const mutationAddToCart = useMutation({
    mutationFn: () =>
      addProductToCart({
        productId: dataProduct._id,
        productQuantities: productData.quantity,
        productSize: productData.sizeId,
      }),
    onMutate: () => {
      dispatch(setIsLoading(true));
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["get-list-cart-items", session?.user?._id],
        (oldData) => {
          if (oldData) {
            const getListCartItemsOld = oldData?.data || [];
            const updateListCartItems = [
              ...getListCartItemsOld,
              ...[
                {
                  user_id: session?.user?._id,
                },
              ],
            ];

            return { ...oldData, data: updateListCartItems };
          } else {
            return oldData;
          }
        }
      );
      toast.success(data?.message);
    },
    onError: (err, _, context) => {
      toast.error(err?.response?.data?.message);
    },
    onSettled: () => {
      dispatch(setIsLoading(false));

      queryClient.invalidateQueries({
        queryKey: ["get-list-cart-items", session?.user?._id],
      });
    },
  });

  const handleAddToCart = () => {
    mutationAddToCart.mutate();
  };

  const imageLoader = ({ src, width, quality }) => {
    const url = new URL(src);
    url.searchParams.set("width", width.toString());
    return url.href;
  };

  const DATA_BREADCRUMB = [
    {
      title: "Sản phẩm",
      link: ROUTERS_PATH.HOME_PRODUCT,
    },
    {
      title:
        dataProduct.product_gender === "men"
          ? "Nam"
          : dataProduct.product_gender === "women"
          ? "Nữ"
          : "",
      link: `${ROUTERS_PATH.HOME_PRODUCT}?gender=${dataProduct.product_gender}`,
    },
  ];

  const NEW_DATA_BREADCRUMB = DATA_BREADCRUMB.concat(
    dataProduct.product_categories.map((item) => ({
      title: item.product_category_name,
      link: `${ROUTERS_PATH.HOME_PRODUCT}?gender=${dataProduct.product_gender}&category=${item._id}`,
    })),
    {
      title: dataProduct.product_name,
    }
  );

  return (
    <>
      {dataProduct && (
        <>
          <BreadcrumbBar data={NEW_DATA_BREADCRUMB} />
          <Box sx={{ width: "100%", margin: "0 auto", paddingTop: "4rem" }}>
            <Box
              sx={{
                display: "flex",
                marginTop: "1rem",
                gap: "2rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <InforImage
                dataProduct={dataProduct}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
              />
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Typography
                  component={"h1"}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "3rem",
                  }}
                >
                  {dataProduct?.product_name}
                </Typography>
                <Typography
                  sx={{
                    color: "#FF0000",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                  }}
                >
                  {ConvertMoney({
                    money: dataProduct?.product_original_price || 0,
                  })}
                </Typography>

                <InforColor dataProduct={dataProduct} />
                <InforSize
                  dataProduct={dataProduct}
                  productData={productData}
                  setProductData={setProductData}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <InforQuantity
                    dataProduct={dataProduct}
                    productData={productData}
                    setProductData={setProductData}
                  />
                  <FavoriteProduct dataProduct={dataProduct} />
                </Box>
                <Typography
                  sx={{
                    color: "#7d7d7d",
                  }}
                >
                  Trong kho còn {productData.stockSizeQuantities}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Button
                    className={!isAvailableProduct ? "disabled-button" : null}
                    sx={{
                      backgroundColor: "black",
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                    onClick={() => handleAddToCart()}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    className={!isAvailableProduct ? "disabled-button" : null}
                  >
                    Mua ngay
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
