"use client";
import LoadingBox from "@/components/generals/LoadingBox";
import useAuth from "@/customHooks/useAuth";
import { ConvertMoney } from "@/utils/convertMoney";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import FavoriteProduct from "./FavoriteProduct";
export default function Infor({ dataProduct }) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const router = useRouter();

  // Add to List Viewed
  const [listViewed] = useLocalStorage("LIST_PRODUCTS_VIEWED", []);
  useEffect(() => {
    const updateListViewed = () => {
      let checkIsValid = true;
      let currentPosition = -1;
      let countPosition = 0;
      for (const itemListViewed of listViewed) {
        // check list viewed has current product?
        if (itemListViewed._id === dataProduct._id) {
          checkIsValid = false;
          currentPosition = countPosition;
          break;
        }
        // check current product in relation list yet?
        const check = itemListViewed.relation_products.find(
          (relationProduct) => relationProduct._id === dataProduct._id
        );
        if (check) {
          checkIsValid = false;
          currentPosition = countPosition;
          break;
        }
        countPosition++;
      }
      // if  exist -> remove and push current item to top list
      if (!checkIsValid) {
        const newListViewed = [...listViewed];
        newListViewed.splice(currentPosition, 1);
        newListViewed.unshift(dataProduct);

        writeStorage("LIST_PRODUCTS_VIEWED", newListViewed);
      }
      // if not exist -> push current item to top list
      else if (checkIsValid) {
        const newListViewed = [...[dataProduct], ...listViewed];
        writeStorage("LIST_PRODUCTS_VIEWED", newListViewed);
      }
    };
    updateListViewed();
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
  }, [productData]);

  useEffect(() => {
    if (dataProduct) {
      if (dataProduct.product_images.length > 0) {
        setActiveImage(dataProduct?.product_images[0]);
      }
    }
  }, [dataProduct]);

  const handleSetQuantity = (type) => {
    if (type === "-") {
      if (productData.quantity === 1) {
        return;
      } else {
        setProductData((productData) => ({
          ...productData,
          quantity: productData.quantity - 1,
        }));
      }
    } else if (type === "+") {
      setProductData((productData) => ({
        ...productData,
        quantity: productData.quantity + 1,
      }));
    }
  };

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
      queryClient.invalidateQueries({
        queryKey: ["get-list-cart-items", session?.user?._id],
      });
    },
  });

  const handleAddToCart = () => {
    mutationAddToCart.mutate();
  };

  return (
    <>
      {mutationAddToCart.isLoading && (
        <LoadingBox isLoading={mutationAddToCart.isLoading} />
      )}
      {dataProduct && (
        <>
          <div className="redirect">
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/">
                <Typography underline="hover" color="inherit">
                  Trang chủ
                </Typography>
              </Link>
              <Link href="/products">
                <Typography underline="hover" color="inherit">
                  Sản phẩm
                </Typography>
              </Link>
              <Typography color="text.primary">
                {dataProduct?.product_name}
              </Typography>
            </Breadcrumbs>
          </div>
          <Box sx={{ width: "100%", margin: "0 auto", paddingTop: "4rem" }}>
            <Box
              sx={{
                display: "flex",
                marginTop: "1rem",
                gap: "2rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  width: { xs: "100%", md: "55%" },
                }}
              >
                <Box
                  sx={{
                    padding: "0 1rem",

                    maxHeight: "50rem",
                    overflowY: "auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      flexDirection: "column",
                    }}
                  >
                    {dataProduct?.product_images?.map((item, i) => (
                      <Box
                        sx={{
                          padding: "1rem",

                          border: "2px solid",
                          borderColor: "transparent",
                          "&.active": {
                            borderColor: "#7A7272",
                          },
                        }}
                        className={activeImage === item ? "active" : null}
                        key={i}
                      >
                        <Box
                          onClick={() => setActiveImage(item)}
                          sx={{
                            width: "4.5rem",
                            height: "4.5rem",

                            position: "relative",
                            cursor: "pointer",
                            padding: "1rem",
                          }}
                        >
                          <Image
                            alt={dataProduct.product_name}
                            src={item}
                            fill
                            sizes="500"
                            style={{
                              maxWidth: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    maxWidth: { xs: "100%", md: "50rem" },
                    flex: 1,
                    height: "50rem",

                    position: "relative",
                  }}
                >
                  <Image
                    src={activeImage}
                    alt={dataProduct.product_name}
                    fill
                    sizes="500"
                    style={{
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "2.5rem",
                  }}
                >
                  {dataProduct?.product_name}
                </Typography>
                <Typography
                  sx={{
                    color: "#FF0000",
                    fontSize: "2rem",
                  }}
                >
                  {ConvertMoney({
                    money: dataProduct?.product_original_price || 0,
                  })}{" "}
                  đ
                </Typography>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "2rem",
                      }}
                    >
                      Màu sắc:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 600,
                      }}
                    >
                      {dataProduct.product_color.product_color_name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    {dataProduct?.relation_products?.map((relationProduct) => (
                      <Box
                        key={relationProduct.product_color.product_color_code}
                        className={
                          productData.color ===
                          relationProduct.product_color.product_color_code
                            ? "active"
                            : null
                        }
                        onClick={() =>
                          router.push(`/products/${relationProduct._id}`)
                        }
                        sx={{
                          cursor: "pointer",
                          minWidth: "4.5rem",
                          height: "4.5rem",
                          backgroundColor:
                            relationProduct.product_color.product_color_code,
                          border: "2px solid",
                          "&.active": {
                            border: "4px solid #7A7272",
                          },
                        }}
                      ></Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "2rem",
                      }}
                    >
                      Kích cỡ:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 600,
                      }}
                    >
                      {productData.size}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    {dataProduct?.product_sizes?.map((item) => (
                      <Box
                        key={item._id}
                        className={
                          productData.size === item.size_type.product_size_name
                            ? "active"
                            : null
                        }
                        onClick={() =>
                          setProductData((productData) => ({
                            ...productData,
                            size: item.size_type.product_size_name,
                            sizeId: item.size_type._id,
                            stockSizeQuantities: item.size_quantities,
                          }))
                        }
                        sx={{
                          minWidth: "4.5rem",
                          height: "4.5rem",
                          border: "2px solid black",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          "&.active": {
                            border: "4px solid #7A7272",
                          },
                        }}
                      >
                        {item.size_type.product_size_name}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "2rem",
                    }}
                  >
                    Số lượng:
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      border: "2px solid #7A7272",
                    }}
                  >
                    <Box
                      onClick={() => handleSetQuantity("-")}
                      sx={{
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "1.7rem",
                      }}
                    >
                      {productData.quantity}
                    </Typography>
                    <Box
                      onClick={() => handleSetQuantity("+")}
                      sx={{
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </Box>
                  </Box>
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
