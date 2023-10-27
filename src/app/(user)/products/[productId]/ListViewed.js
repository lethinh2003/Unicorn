"use client";
import {
  SkeletonAllProductItem,
  ViewedProductItem,
} from "@/components/product/ProductItem";
import { Box, Typography } from "@mui/material";
import { useLocalStorage } from "@rehooks/local-storage";
import { useEffect, useRef, useState } from "react";
export default function ListViewed() {
  const [listViewed] = useLocalStorage("LIST_PRODUCTS_VIEWED", []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setData(listViewed);
    }, 100);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [listViewed]);
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
          {!isLoading &&
            data?.slice(0, 10)?.map((item, i) => (
              <ViewedProductItem
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
