"use client";
import { ProductItem } from "@/components/product/ProductItem";
import { TYPE_PRODUCT_ITEM_DISPLAY } from "@/configs/config.products";
import { Box, Typography,Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
const LIMIT_ITEMS = 10;
export default function ListViewed() {
  const dataListViewed = useSelector((state) => state.viewedProducts);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataListViewed.slice(0, LIMIT_ITEMS));
  }, [dataListViewed]);
  return (
    <>
      <Box>
        <Box
          sx={{
            padding: "1.5rem 0",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            Sản phẩm đã xem
          </Typography>
        </Box>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            overflowX: "hidden",
            overflowY: "hidden",
            position: "relative",
          }}
        >
          <Swiper
            grabCursor={true}
            slidesPerView={4}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 0.5,
            }}
            navigation={{
              nextEl: ".viewed-button-next",
              prevEl: ".viewed-button-prev",
              clickable: true,
            }}
            pagination={{ el: "swiper-pagination", clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="relative"
          >
            {data.map((item, i) => (
              <SwiperSlide key={item._id}>
                <ProductItem
                  product={{ ...item, child_products: item.relation_products }}
                  sx={{
                    minWidth: "25rem",
                  }}
                  type={TYPE_PRODUCT_ITEM_DISPLAY.VIEWED}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
            <div className="viewed-button-controler absolute top-1/2 z-10 flex justify-between">
              <Button className="viewed-button-prev">
                <NavigateBeforeIcon className="" sx={{ fontSize: 50 }} />
              </Button>
              <Button className="viewed-button-next">
                <NavigateNextIcon className="" sx={{ fontSize: 50 }} />
              </Button>
            </div>
          
        </div>
      </Box>
    </>
  );
}
