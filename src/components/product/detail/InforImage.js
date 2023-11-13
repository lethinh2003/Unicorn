"use client";
import { Box } from "@mui/material";
import Image from "next/image";

import { useState } from "react";

export default function InforImage({
  dataProduct,
  setActiveImage,
  activeImage,
}) {
  const [imageSliders, setImageSliders] = useState(
    dataProduct?.product_images || []
  );

  const imageLoader = ({ src, width, quality }) => {
    const url = new URL(src);
    url.searchParams.set("width", width.toString());
    return url.href;
  };

  return (
    <>
      {dataProduct && (
        <>
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
                {imageSliders.map((item, i) => (
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
                          width: "100%",
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
                width: "100%",

                position: "relative",
              }}
            >
              <Image
                src={activeImage}
                loader={(props) => imageLoader({ ...props, width: 750 })}
                alt={dataProduct.product_name}
                fill
                sizes="1000"
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
