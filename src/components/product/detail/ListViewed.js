"use client";
import {
  ProductItem,
  ProductItemLoading,
} from "@/components/product/ProductItem";
import { TYPE_PRODUCT_ITEM_DISPLAY } from "@/configs/config.products";
import { Box, Typography } from "@mui/material";
import { useLocalStorage } from "@rehooks/local-storage";
import { useEffect, useRef, useState } from "react";
export default function ListViewed() {
  const [listViewed] = useLocalStorage("LIST_PRODUCTS_VIEWED", []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setData(listViewed);
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
                <ProductItemLoading
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
              <ProductItem
                key={item._id}
                product={{ ...item, child_products: item.relation_products }}
                sx={{
                  minWidth: "25rem",
                }}
                type={TYPE_PRODUCT_ITEM_DISPLAY.VIEWED}
              />
            ))}
        </Box>
      </Box>
    </>
  );
}
