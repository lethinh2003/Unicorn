"use client";
import {
  Breadcrumbs,
  Typography,
  Stack,
  Checkbox,
  Grid,
  Fab,
  Button,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Favorite from "@mui/icons-material/Favorite";
import { useState } from "react";
import Filter from "./filter";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    parent_product_id: 1,
    product_name:
      "Áo Thun Nam Tay Ngắn Họa Tiết Áo Thun Nam Tay Ngắn Họa Tiết Áo Thun Nam Tay Ngắn Họa Tiết Áo Thun Nam Tay Ngắn Họa Tiết Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 2,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 3,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 4,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 5,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 6,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 7,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 7,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 6,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 7,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 7,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 7,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
  {
    parent_product_id: 7,
    product_name: "Áo Thun Nam Tay Ngắn Họa Tiết",
    product_color: "",
    product_sizes: [],
    product_categories: "",
    product_images: "/tatcasanpham.jpg",
    product_original_price: 50000,
  },
];
const productsPerPage = 12;

export default function Products() {
  const [visibleProducts, setVisibleProducts] = useState(productsPerPage);
  const loadMoreProducts = () => {
    setVisibleProducts(visibleProducts + productsPerPage);
  };
  return (
    <div className="product-container">
      <div className="product-header">
        <div className="redirect">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Typography color="text.primary">Nam</Typography>
          </Breadcrumbs>
        </div>
        <div className="product-page-title">
          <h1 className="product-page-title-text">Thời trang nam</h1>
        </div>
      </div>
      <div className="header-image-container">
        <Image
          alt=""
          src="/maleProduct.jpg"
          width={1000}
          height={500}
          className="header-image"
        />
      </div>
      <Stack direction="row" className="product-page-body">
        <div className="product-filter">
          <Filter></Filter>
        </div>
        <div className="product-item-container">
          <div className="products-page-header">
            <span className="products-page-header-title">Tất cả sản phẩm</span>
          </div>
          <Grid container className="products-item-wrap">
            {products.slice(0, visibleProducts).map((product) => (
              <Stack className="products-item" key={product.parent_product_id}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                  sx={{
                    position: "absolute",
                    color: "#fff",
                    right: 0,
                  }}
                />
                <Image
                  src={product.product_images}
                  alt=""
                  width={500}
                  height={500}
                  className="product-item-image"
                />
                <div className="product-details">
                  <span className="product-item-name">
                    {product.product_name}
                  </span>
                  <span className="product-item-price">
                    {product.product_original_price}đ
                  </span>
                </div>
              </Stack>
            ))}
          </Grid>
          {visibleProducts < products.length && (
            <div className="viewmore">
              <Button onClick={loadMoreProducts} className="viewmore-button">
                Xem thêm
              </Button>
            </div>
          )}
        </div>
      </Stack>
    </div>
  );
}
