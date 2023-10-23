"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import { ConvertMoney } from "@/utils/convertMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
const LIST_COLOR = [
  {
    name: "Đen",
    code: "#000",
    key: "black",
  },
  {
    name: "Xanh",
    code: "#46E539",
    key: "green",
  },
  {
    name: "Đỏ",
    code: "#F60C0C",
    key: "red",
  },
  {
    name: "Cam",
    code: "#FE9142",
    key: "orange",
  },
];

export default function Infor({ productId }) {
  const [productData, setProductData] = useState({
    quantity: 1,
    color: "black",
    size: "S",
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(
    "https://i.imgur.com/yLTbVSD.png"
  );

  const getDetailInformationProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/products/${productId}`
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const {
    data: dataProduct,
    isLoading,
    isError,
  } = useQuery(["get-detail-information-product", productId], () =>
    getDetailInformationProduct()
  );

  useEffect(() => {
    if (dataProduct) {
      if (dataProduct.product_images.length > 0) {
        setActiveImage(dataProduct?.product_images[0]);
      }
    }
    console.log({ dataProduct });
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
  const findColorNameByKey = (key) => {
    let name = "";
    const findColor = LIST_COLOR.find((color) => color.key === key);
    if (findColor) {
      name = findColor.name;
    }
    return name;
  };
  return (
    <>
      {isLoading && <LoadingContent />}
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
          <Box sx={{ maxWidth: "1500px", width: "100%", margin: "0 auto" }}>
            <Box
              sx={{
                display: "flex",
                marginTop: "1rem",
                gap: "2rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  width: "55%",
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
                            src={item}
                            layout="fill"
                            objectFit="contain"
                            style={{
                              maxWidth: "100%",
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    maxWidth: "50rem",
                    flex: 1,
                    height: "50rem",
                    backgroundColor: "black",
                    position: "relative",
                  }}
                >
                  <Image src={activeImage} layout="fill" objectFit="contain" />
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
                      {findColorNameByKey(productData.color)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    {LIST_COLOR.map((item) => (
                      <Box
                        key={item.key}
                        className={
                          productData.color === item.key ? "active" : null
                        }
                        onClick={() =>
                          setProductData((productData) => ({
                            ...productData,
                            color: item.key,
                          }))
                        }
                        sx={{
                          cursor: "pointer",
                          minWidth: "4.5rem",
                          height: "4.5rem",
                          backgroundColor: item.code,
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
                  {!isFavorite && (
                    <FavoriteBorderOutlinedIcon
                      onClick={() => setIsFavorite(!isFavorite)}
                      sx={{
                        cursor: "pointer",
                        fontSize: "3rem",
                      }}
                    />
                  )}
                  {isFavorite && (
                    <FavoriteIcon
                      onClick={() => setIsFavorite(!isFavorite)}
                      sx={{
                        cursor: "pointer",
                        color: "#f44336",
                        fontSize: "3rem",
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "black",
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button>Mua ngay</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
