"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
const DESC = [
  {
    title: "Tổng quan",
    desc: "- Smooth fleece lightly brushed for extra warmth.",
  },
  {
    title: "Chất liệu",
    desc: "Xin lưu ý mã số nhận diện của sản phẩm có thể có sự khác biệt, kể cả khi đó là cùng một mặt hàng.",
  },
];

export default function Description({ productId }) {
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

  const convertTypeDescription = (type) => {
    if (type === "overview") {
      return "Tổng quan";
    } else if (type === "material") {
      return "Chất liệu";
    }
    return "";
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            borderBottom: "2px solid",
            padding: "1.5rem 0",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Mô tả sản phẩm
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isLoading && <LoadingContent />}
          {dataProduct?.product_description?.map((item) => (
            <Box
              key={item.type}
              sx={{
                borderBottom: "1px solid",
                padding: "1.5rem 0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2rem",
                }}
              >
                {convertTypeDescription(item.type)}
              </Typography>
              <Typography
                sx={{
                  paddingLeft: "1rem",
                }}
              >
                {item.content}
              </Typography>
            </Box>
          ))}

          <Box
            sx={{
              padding: "1.5rem 0",
            }}
          >
            <Typography
              sx={{
                fontSize: "2rem",
              }}
            >
              Chia sẻ
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <FacebookIcon
                sx={{
                  fontSize: "3rem",
                }}
              />
              <TwitterIcon
                sx={{
                  fontSize: "3rem",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
