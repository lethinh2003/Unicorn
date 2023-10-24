import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Typography } from "@mui/material";
import { getDetailInformationProduct } from "./InforPage";

export default async function Description({ productId }) {
  const dataProduct = await getDetailInformationProduct({
    productId,
  });

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
