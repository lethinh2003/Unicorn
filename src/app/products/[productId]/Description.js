"use client";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Typography } from "@mui/material";
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

export default function Description() {
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
          {DESC.map((item) => (
            <Box
              key={item.title}
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
                {item.title}
              </Typography>
              <Typography
                sx={{
                  paddingLeft: "1rem",
                }}
              >
                {item.desc}
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
