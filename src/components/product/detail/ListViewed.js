"use client";
import { ProductItem } from "@/components/product/ProductItem";
import { TYPE_PRODUCT_ITEM_DISPLAY } from "@/configs/config.products";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
            overflowY: "auto",
          }}
        >
          {data.map((item, i) => (
            <ProductItem
              key={item._id}
              product={{ ...item, child_products: item.relation_products }}
              sx={{
                minWidth: "25rem",
              }}
              type={TYPE_PRODUCT_ITEM_DISPLAY.VIEWED}
            />
          ))}
        </div>
      </Box>
    </>
  );
}
