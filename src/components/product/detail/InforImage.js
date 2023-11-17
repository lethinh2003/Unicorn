"use client";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import { useState, useRef } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function InforImage({
  dataProduct,
  setActiveImage,
  activeImage,
}) {
  const [imageSliders, setImageSliders] = useState(
    dataProduct?.product_images || []
  );

  const [isScrollUp, setScrollUp] = useState(true)
  const [isScrollDown, setScrollDown] = useState(false)
  const [isGoPrev, setGoPrev] = useState(true)
  const [isGoNext, setGoNext] = useState(false)
  const [isCount, setCount] = useState(0)
  const containerRef = useRef(null);

  const imageLoader = ({ src, width, quality }) => {
    const url = new URL(src);
    url.searchParams.set("width", width.toString());
    return url.href;
  };

  const scrollUpSlider = () => {
    containerRef.current.scrollTop -= 50
    if (Math.ceil(containerRef.current.scrollTop <= 50)) {
      setScrollUp(true)
    }
    else {
      setScrollDown(false)
      setScrollUp(false)
    }
  }

  const scrollDownSlider = () => {
    containerRef.current.scrollTop += 50
    const sliderScrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
    if (Math.ceil(containerRef.current.scrollTop) >= sliderScrollHeight - 50) {
      setScrollDown(true)
    }
    else {
      setScrollDown(false)
      setScrollUp(false)
    }
  }

  const goPrev = () => {
    const value = isCount - 1
    setCount(value)
    setActiveImage(imageSliders[value])
    scrollUpSlider()
    if (value <= 0) {
      setGoPrev(true)
    } else {
      setGoNext(false)
      setGoPrev(false)
    }
  }

  const goNext = () => {
    const value = isCount + 1
    setCount(value)
    setActiveImage(imageSliders[value])
    scrollDownSlider()
    if (value == imageSliders.length - 1) {
      setGoNext(true)
    } else {
      setGoNext(false)
      setGoPrev(false)
    }
  }

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
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Box
                ref={containerRef}
                sx={{
                  padding: "0 1rem",
                  maxHeight: "40rem",
                  overflowY: "auto",
                  '- ms - overflow - style': 'none',
                  scrollbarWidth: 'none',
                  scrollBehavior: 'smooth',
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  borderBottom: '.2rem solid #ededed',
                  paddingBottom: '1rem'
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
                          const rect = e.currentTarget.getBoundingClientRect();
                          const offsetTop = rect.top + window.scrollY;
                          const containerHeight = containerRef.current.clientHeight;
                          const scrollTopValue = offsetTop - containerHeight / 2;
                          containerRef.current.scrollTop = scrollTopValue;
                          setActiveImage(item)
                          setCount(i)
                        }}
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
              <Box sx={{
                maxHeight: '8rem',
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Button sx={{
                  minWidth: ' .5rem',
                  lineHeight: '1.5rem',
                  backgroundColor: '#fdfdfd',
                  color: '#767676',
                  opacity: .9,
                  '&:hover': {
                    backgroundColor: '#767676',
                    color: '#fdfdfd'
                  }
                }}
                  disabled={isScrollUp}
                  onClick={() => scrollUpSlider()}
                ><KeyboardArrowUpIcon /></Button>
                <Button sx={{
                  minWidth: ' .5rem',
                  lineHeight: '1.5rem',
                  backgroundColor: '#fdfdfd',
                  color: '#767676',
                  opacity: .9,
                  '&:hover': {
                    backgroundColor: '#767676',
                    color: '#fdfdfd'
                  }
                }}
                  disabled={isScrollDown}
                  onClick={() => scrollDownSlider()}
                ><KeyboardArrowDownIcon /></Button>
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
                overflowX: 'hidden'
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
                    position: 'absolute',
                    maxWidth: "100%",
                    height: "100%",
                    objectFit: "contain",
                    left: `${i * 100}%`,
                    transition: '1s',
                    transform: `translateX(-${isCount * 100}%)`,
                  }}
                />
              ))}

              <Button sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                minWidth: '1rem',
                minHeight: '1rem',
                maxWidth: ' 3.5rem',
                maxHeight: '3.5rem',
                lineHeight: 0,
                border: '.1rem solid #ccc',
                backgroundColor: '#fdfdfd',
                color: '#767676',
                opacity: .9,
                '&:hover': {
                  backgroundColor: '#767676',
                  color: '#fdfdfd'
                }
              }}
                disabled={isGoPrev}
                onClick={() => goPrev()}>
                <KeyboardArrowLeftIcon />
              </Button>
              <Button sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                minWidth: '1rem',
                minHeight: '1rem',
                maxWidth: ' 3.5rem',
                maxHeight: '3.5rem',
                lineHeight: 0,
                border: '.1rem solid #ccc',
                backgroundColor: '#fdfdfd',
                color: '#767676',
                opacity: .9,
                '&:hover': {
                  backgroundColor: '#767676',
                  color: '#fdfdfd'
                }
              }}
                disabled={isGoNext}
                onClick={() => goNext()}>
                <KeyboardArrowRightIcon />
              </Button>
            </Box>
          </Box >
        </>
      )
      }
    </>
  );
}

