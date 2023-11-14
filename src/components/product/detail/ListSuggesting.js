"use client";
import {
  ProductItem,
  ProductItemLoading,
} from "@/components/product/ProductItem";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
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
const PRODUCTS = [];
const PAGE = 1;
const ITEMS_OF_PAGE = 5;
export default function ListSuggesting({ productId }) {
  const getListSuggesProducts = async () => {
    try {
      const results = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/products/suggesting?productId=${productId}&page=${PAGE}&itemsOfPage=${ITEMS_OF_PAGE}`
      );
      const data = results.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const { data, error, isLoading, isError } = useQuery(
    ["get-suggesting-products", productId],
    () => getListSuggesProducts(),
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError]);
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
            }}
          >
            Có lẽ bạn sẽ thích
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            gap: "1rem",
            overflowX: "hidden",
          }}
        >
          {isLoading && (
            <>
              {Array.from({ length: 3 }).map((_item, i) => (
                <ProductItemLoading
                  sx={{
                    width: "20rem",
                    minWidth: "20rem",
                  }}
                  key={i}
                />
              ))}
            </>
          )}
          <Swiper
            grabCursor={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 0.5,
            }}
            navigation={{
              nextEl: ".recommend-button-next",
              prevEl: ".recommend-button-prev",
              clickable: true,
            }}
            pagination={{ el: "swiper-pagination", clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation]}
          >
            {data?.map((item) => (
              <SwiperSlide key={item._id}>
                <ProductItem
                  product={item}
                  sx={{
                    width: "20rem",
                    height: "auto",
                    minWidth: "20rem",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="recommend-button-controler absolute top-1/2 z-10 flex justify-between">
            <Button className="recommend-button-prev">
              {!isLoading ? <NavigateBeforeIcon className="" sx={{ fontSize: 50 }} /> : null}
            </Button>
            <Button className="recommend-button-next">
              {!isLoading ? <NavigateNextIcon className="" sx={{ fontSize: 50 }} /> : null}
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
}
