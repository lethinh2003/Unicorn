"use client";
import {
  AllProductItem,
  SkeletonAllProductItem,
} from "@/components/product/ProductItem";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
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
            display: "flex",
            gap: "1rem",
            overflowY: "auto",
          }}
        >
          {isLoading && (
            <>
              {Array.from({ length: 5 }).map((_item, i) => (
                <SkeletonAllProductItem
                  sx={{
                    minWidth: "25rem",
                  }}
                  key={i}
                />
              ))}
            </>
          )}
          {data?.map((item) => (
            <AllProductItem
              key={item._id}
              product={item}
              sx={{
                minWidth: "25rem",
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
