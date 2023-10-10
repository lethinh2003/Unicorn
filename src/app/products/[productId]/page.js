"use client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
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
const LIST_SIZE = [
  {
    name: "S",
    code: "S",
  },
  {
    name: "M",
    code: "M",
  },
  {
    name: "L",
    code: "L",
  },
  {
    name: "XL",
    code: "XL",
  },
];
const LIST_IMAGE = [
  "https://i.imgur.com/dGG5OxL.jpg",
  "https://i.imgur.com/mCEHOhu.jpg",
  "https://i.imgur.com/Cr8ue9i.jpg",
  "https://i.imgur.com/MITcdTi.jpg",
  "https://i.imgur.com/qGsdzKQ.jpg",
];
export default function Home() {
  const [productData, setProductData] = useState({
    quantity: 1,
    color: "black",
    size: "S",
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(
    "https://i.imgur.com/dGG5OxL.jpg"
  );

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
      <Box sx={{ maxWidth: "1500px", width: "100%", margin: "0 auto" }}>
        <div className="redirect-title-container">
          <div className="redirect">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Trang chủ
              </Link>
              <Link underline="hover" color="inherit" href="/products">
                Sản phẩm
              </Link>
              <Typography color="text.primary">
                Áo thun tay ngắn họa tiết
              </Typography>
            </Breadcrumbs>
          </div>
        </div>

        <Box
          sx={{
            display: "flex",
            marginTop: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              width: "40%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
              }}
            >
              {LIST_IMAGE.map((item, i) => (
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
            <Box
              sx={{
                maxWidth: "50rem",
                width: "100%",
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
              Áo thun nam tay ngắn họa tiết
            </Typography>
            <Typography
              sx={{
                color: "#FF0000",
                fontSize: "2rem",
              }}
            >
              150.000 đ
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
                    className={productData.color === item.key ? "active" : null}
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
                {LIST_SIZE.map((item) => (
                  <Box
                    key={item.code}
                    className={productData.size === item.code ? "active" : null}
                    onClick={() =>
                      setProductData((productData) => ({
                        ...productData,
                        size: item.code,
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
                    {item.name}
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
  );
}
