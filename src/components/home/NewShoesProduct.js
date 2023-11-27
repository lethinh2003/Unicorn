"use client";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NewShoesProduct() {
  const imageSliders = ["/Nike1.png", "/Nike2.png", "/Nike3.png"];
  const [activeImage, setActiveImage] = useState(imageSliders[1]);

  const calculatePosition = (index) => {
    const centerIndex = imageSliders.indexOf(activeImage);
    const offset = index - centerIndex;
    const left = offset === 0 ? 200 : 0;
    const rotateObject = centerIndex === 0 ? 360 : 0;
    const scaleObject = index === centerIndex ? 4 : 1;
    const top = offset === 0 ? 220 : offset === 1 || offset === -2 ? 550 : 0;
    return { x: left, y: top, scale: scaleObject, rotate: rotateObject };
  };

  return (
    <>
      <Container sx={{ height: "80rem", marginTop: "5%", marginBottom: "10%" }}>
        <Paper
          elevation={5}
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
            position: "relative",
            background: "url(/template.jpg) no-repeat top center/ contain",
          }}
        >
          <Stack
            direction="row"
            sx={{
              top: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              padding: "3.5rem 0",
              alignItems: "center",
              position: "absolute",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
              {imageSliders.map((item, index) => {
                const { x, y, scale, rotate } = calculatePosition(index);
                return (
                  <motion.div
                    key={index}
                    animate={{ x, y, scale, rotate }}
                    transition={{
                      type: "spring",
                      duration: 1.5,
                    }}
                    className={item === activeImage ? "nike active" : "nike"}
                    onClick={() => setActiveImage(item)}
                  >
                    <img
                      src={item}
                      key={index}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </motion.div>
                );
              })}
            </Box>
            <Stack
              spacing={5}
              sx={{
                width: "100%",
                minWidth: "50rem",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: "600" }}>
                SẢN PHẨM MỚI
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Box
                  sx={{
                    content: '""',
                    height: ".5rem",
                    width: "10rem",
                    position: "absolute",
                    background: "#a5e8d7",
                    top: "100%",
                    left: {
                      0: "15%",
                      1: "50%",
                      2: "84%",
                    }[imageSliders.indexOf(activeImage)],
                    zIndex: 0,
                    transition: "all .3s",
                    transform: "translateX(-40%)",
                  }}
                ></Box>
                {imageSliders.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "20rem",
                      borderRadius: "100%",
                      zIndex: 2,
                      transition: ".5s",
                      cursor: "pointer",
                    }}
                    className={item === activeImage ? "active" : ""}
                    onClick={() => setActiveImage(item)}
                  >
                    <img
                      src={item}
                      key={index}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        transform: "rotate(15deg)",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
              <Button
                sx={{
                  width: "30%",
                  height: "5rem",
                  color: "#f9f9f9",
                  backgroundColor: "#000",
                  border: ".5rem solid #000",
                  borderRadius: "2.5rem",
                  "&:hover": {
                    color: "#000",
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                Xem thêm
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
