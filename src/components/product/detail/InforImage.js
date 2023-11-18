"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function InforImage({
  dataProduct,
  setActiveImage,
  activeImage,
}) {
  const [imageSliders, setImageSliders] = useState(
    dataProduct?.product_images || []
  );

  const [isScrollUp, setScrollUp] = useState(true);
  const [isScrollDown, setScrollDown] = useState(false);
  const [isGoPrev, setGoPrev] = useState(true);
  const [isGoNext, setGoNext] = useState(false);
  const [isCount, setCount] = useState(0);
  const containerRef = useRef(0);
  // 73 = sizeImage(4remx4rem) + gap(1rem) + padding(1rem) + border(2px)
  const sizeOfImage = 73.2;
  const imageLoader = ({ src, width, quality }) => {
    const url = new URL(src);
    url.searchParams.set("width", width.toString());
    return url.href;
  };

  useEffect(() => {
    const handleScroll = () => {
      checkValueScroll();
    };

    containerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      containerRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollUpSlider = () => {
    const newScrollTop = containerRef.current.scrollTop - sizeOfImage;
    containerRef.current.scrollTop = newScrollTop;
  };

  const scrollDownSlider = () => {
    const newScrollTop = containerRef.current.scrollTop + sizeOfImage;
    containerRef.current.scrollTop = newScrollTop;
  };

  const checkValueScroll = () => {
    const sliderScrollHeight =
      containerRef.current.scrollHeight - containerRef.current.clientHeight;
    const currentScrollTop = containerRef.current.scrollTop;

    if (currentScrollTop <= 0) {
      setScrollUp(true);
      setScrollDown(false);
    } else if (
      Math.ceil(currentScrollTop) >=
      sliderScrollHeight - sizeOfImage / 2
    ) {
      setScrollUp(false);
      setScrollDown(true);
    } else {
      setScrollUp(false);
      setScrollDown(false);
    }
  };

  const goPrev = () => {
    const value = isCount - 1;
    setCount(value);
    setActiveImage(imageSliders[value]);
    scrollUpSlider();
    checkValue(value);
  };

  const goNext = () => {
    const value = isCount + 1;
    setCount(value);
    setActiveImage(imageSliders[value]);
    scrollDownSlider();
    checkValue(value);
  };

  const checkValue = (value) => {
    if (value <= 0) {
      setGoPrev(true);
    } else if (value == imageSliders.length - 1) {
      setGoNext(true);
    } else {
      setGoNext(false);
      setGoPrev(false);
    }
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
            <Stack
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                ref={containerRef}
                sx={{
                  padding: "0 1rem",
                  maxHeight: "36rem",
                  height: "36rem",
                  overflowY: "auto",
                  "- ms - overflow - style": "none",
                  scrollbarWidth: "none",
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  borderBottom: ".2rem solid #ededed",
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
                        onClick={(e) => {
                          setActiveImage(item);
                          setCount(i);
                          checkValue(i);
                          checkValueScroll(containerRef.current.scrollTop);
                        }}
                        sx={{
                          width: "4rem",
                          height: "4rem",
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
                            position: "absolute",
                            width: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                            transition: "1s",
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  maxHeight: "8rem",
                  maxWidth: "70%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                  sx={{
                    minWidth: " .5rem",
                    lineHeight: "1.5rem",
                    backgroundColor: "#fdfdfd",
                    color: "#767676",
                    opacity: 0.9,
                    "&:hover": {
                      backgroundColor: "#767676",
                      color: "#fdfdfd",
                    },
                  }}
                  disabled={isScrollUp}
                  onClick={() => scrollUpSlider()}
                >
                  <KeyboardArrowUpIcon />
                </Button>
                <Button
                  sx={{
                    minWidth: " .5rem",
                    lineHeight: "1.5rem",
                    backgroundColor: "#fdfdfd",
                    color: "#767676",
                    opacity: 0.9,
                    "&:hover": {
                      backgroundColor: "#767676",
                      color: "#fdfdfd",
                    },
                  }}
                  disabled={isScrollDown}
                  onClick={() => scrollDownSlider()}
                >
                  <KeyboardArrowDownIcon />
                </Button>
              </Box>
            </Stack>
            <Box
              className="slider"
              sx={{
                maxWidth: { xs: "100%", md: "50rem" },
                flex: 1,
                height: "50rem",
                width: "100%",
                position: "relative",
                overflowX: "hidden",
              }}
            >
              {imageSliders.map((item, i) => (
                <Image
                  key={i}
                  src={item}
                  loader={(props) => imageLoader({ ...props, width: 750 })}
                  alt={dataProduct.product_name}
                  fill
                  sizes="1000"
                  style={{
                    position: "absolute",
                    maxWidth: "100%",
                    height: "100%",
                    objectFit: "contain",
                    left: `${i * 100}%`,
                    transition: "1s",
                    transform: `translateX(-${isCount * 100}%)`,
                  }}
                />
              ))}

              <Button
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  minWidth: "1rem",
                  minHeight: "1rem",
                  maxWidth: " 3.5rem",
                  maxHeight: "3.5rem",
                  lineHeight: 0,
                  border: ".1rem solid #ccc",
                  backgroundColor: "#fdfdfd",
                  color: "#767676",
                  opacity: 0.9,
                  "&:hover": {
                    backgroundColor: "#767676",
                    color: "#fdfdfd",
                  },
                }}
                disabled={isGoPrev}
                onClick={() => goPrev()}
              >
                <KeyboardArrowLeftIcon />
              </Button>
              <Button
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  minWidth: "1rem",
                  minHeight: "1rem",
                  maxWidth: " 3.5rem",
                  maxHeight: "3.5rem",
                  lineHeight: 0,
                  border: ".1rem solid #ccc",
                  backgroundColor: "#fdfdfd",
                  color: "#767676",
                  opacity: 0.9,
                  "&:hover": {
                    backgroundColor: "#767676",
                    color: "#fdfdfd",
                  },
                }}
                disabled={isGoNext}
                onClick={() => goNext()}
              >
                <KeyboardArrowRightIcon />
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
