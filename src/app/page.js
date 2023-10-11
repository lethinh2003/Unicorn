"use client";
import { Container, Button, Stack } from "@mui/material";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const imageSliders = ["/slider1.jpg", "/slider2.jpg", "/slider3.jpg"];

export default function Home() {
  return (
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
              <Link href="#" className="male-products gender-products-item" >
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
  );
}
