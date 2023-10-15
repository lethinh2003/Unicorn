"use client";
import { Box, Button, Checkbox, Container, Typography } from "@mui/material";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Stack } from "@mui/material";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const imageSliders = ["/slider1.jpg", "/slider2.jpg", "/slider3.jpg"];

export default function Home() {
  //style Title
  const TitleStyle = {
    fontWeight: 700,
    textAlign: "center",
    color: "#000000",
    position: "relative",
    display: "inline-block",
    padding: "0 2rem",
    left: "50%",
    transform: "translateX(-50%)",
    textShadow: "0 .2rem 1rem rgba(0, 0, 0, .2)",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      bottom: "1rem",
      left: 0,
      zIndex: -1,
      borderBottom: "1.5rem solid #D4D0D0",
    },
  };
  // Fake Data Source
  const Products = [0, 1, 2, 4];
  const ColorProducts = ["#000000", "#FF9EAA", "#38AC8F"];
  //Logic
  const Router = useRouter();

  return (
    <>
      <div className="home-container">
        <div className="swiper-container">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 0.5,
            }}
            pagination={{ el: "swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-next-button",
              prevEl: ".swiper-prev-button",
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="swiper-container"
          >
            {imageSliders.map((image, index) => (
              <SwiperSlide key={index} className="swiper-item">
                <Link href="#" className="slider-image-container">
                  <Image
                    src={image}
                    className="slider-image"
                    width={2000}
                    height={200}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-control">
            <Button className="swiper-prev-button swiper-control-button">
              <NavigateBeforeIcon fontSize="large" />
            </Button>
            <Button className="swiper-next-button swiper-control-button">
              <NavigateNextIcon fontSize="large" />
            </Button>
          </div>
        </div>
        <div className="products-gender-option-container">
          <Container>
            <Stack direction="row" spacing={5}>
              <div className="male-products gender-products-item">
                <Link href="#" className="male-products gender-products-item">
                  <Image
                    src="/male-products.jpg"
                    width={1000}
                    height={100}
                    className="products-gender-image"
                  />
                  <span className="gender-product-title">Thời trang nam</span>
                </Link>
              </div>
              <div>
                <Link href="#" className="female-products gender-products-item">
                  <Image
                    src="/female-products.jpg"
                    width={1300}
                    height={100}
                    className="products-gender-image"
                  />
                  <span className="gender-product-title">Thời trang nữ</span>
                </Link>
              </div>
            </Stack>
          </Container>
        </div>
      </div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            marginTop: "10rem",
          }}
        >
          <Link href={"/"}>
            <Typography variant="h3" sx={TitleStyle} gutterBottom>
              SẢN PHẨM MỚI
            </Typography>
          </Link>
          <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
            Các sản phẩm bắt nhịp quốc tế, nàng thời thượng không nên bỏ lỡ
          </Typography>

          <div className="home-product">
            {Products.map((item) => {
              return (
                <Link
                  href={"/products/test"}
                  className="home-product__items"
                  style={{ position: "relative" }}
                >
                  <img
                    className="home-product__img"
                    src="https://routine.vn/media/catalog/product/cache/5de180fdba0e830d350bd2803a0413e8/a/o/ao-nam-10f23swe001_beige_4__2_1.jpg?fbclid=IwAR2xFMp1MTr7GgWm_wmfDwjWIoRr9yOWSpKA0JSbOYRgdaIU05IWcEimrCA"
                  ></img>
                  <Box
                    sx={{
                      margin: "1rem",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Áo thun nam tay ngắn hoạ tiết
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "600" }}
                      gutterBottom
                    >
                      100.000đ
                    </Typography>
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      color="error"
                      size="large"
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    />
                    <div
                      className="home-product__colors"
                      style={{ display: "flex" }}
                    >
                      {ColorProducts.map((color) => {
                        return (
                          <div
                            style={{
                              width: "2rem",
                              height: "2rem",
                              marginRight: "1rem",
                              backgroundColor: color,
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </Box>
                </Link>
              );
            })}
          </div>
          <Button
            sx={{
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#FFFFFF",
              border: ".1rem solid #000000",
              color: "#000000",
              marginBottom: "1rem",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#000000",
              },
            }}
            onClick={() => Router.push("/products")}
          >
            Xem thêm
          </Button>
        </Box>
        <Box sx={{ marginTop: "10rem" }}>
          <Link href={"/"}>
            <Typography variant="h3" sx={TitleStyle} gutterBottom>
              SẢN PHẨM BÁN CHẠY
            </Typography>
          </Link>
          <div className="home-special-product">
            <div className="home-special-product-item">
              <img src="./sanphambanchay1.jpg" />
            </div>
            <div className="home-special-product-item">
              <img src="./sanphambanchay2.jpg" />
            </div>
            <div className="home-special-product-item">
              <img src="./sanphambanchay3.jpg" />
            </div>
          </div>

          <Button
            sx={{
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#FFFFFF",
              border: ".1rem solid #000000",
              color: "#000000",
              margin: "2rem",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#000000",
              },
            }}
            onClick={() => Router.push("/products")}
          >
            Xem ngay
          </Button>
        </Box>
        <Box sx={{ marginTop: "10rem" }}>
          <Link href={"/"}>
            <Typography variant="h3" sx={TitleStyle} gutterBottom>
              SALE ĐỒNG GIÁ
            </Typography>
          </Link>
          <div className="home-product">
            {Products.map((item) => {
              return (
                <Link
                  href={"/products/test"}
                  className="home-product__items"
                  style={{ position: "relative" }}
                >
                  <img
                    className="home-product__img"
                    src="https://routine.vn/media/catalog/product/cache/5de180fdba0e830d350bd2803a0413e8/a/o/ao-nam-10f23swe001_beige_4__2_1.jpg?fbclid=IwAR2xFMp1MTr7GgWm_wmfDwjWIoRr9yOWSpKA0JSbOYRgdaIU05IWcEimrCA"
                  ></img>
                  <Box
                    sx={{
                      margin: "1rem",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Áo thun nam tay ngắn hoạ tiết
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "600" }}
                      gutterBottom
                    >
                      100.000đ
                    </Typography>
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      color="error"
                      size="large"
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    />
                    <div
                      className="home-product__colors"
                      style={{ display: "flex" }}
                    >
                      {ColorProducts.map((color) => {
                        return (
                          <div
                            style={{
                              width: "2rem",
                              height: "2rem",
                              marginRight: "1rem",
                              backgroundColor: color,
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </Box>
                </Link>
              );
            })}
          </div>
          <Button
            sx={{
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#FFFFFF",
              border: ".1rem solid #000000",
              color: "#000000",
              marginBottom: "1rem",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#000000",
              },
            }}
            onClick={() => Router.push("/products")}
          >
            Xem thêm
          </Button>
        </Box>
      </Container>
    </>
  );
}
