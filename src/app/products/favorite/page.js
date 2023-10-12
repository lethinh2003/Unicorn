'use client'
import { Container, Breadcrumbs, Typography, Stack,Checkbox } from "@mui/material";
import { useState } from "react";
import Favorite from "@mui/icons-material/Favorite";
import Link from "next/link";
import Image from "next/image";


const FAVORITE_PRODUCTS = [
  {
    product_id: "1",
    product_name:
      "Áo thun tay ngắn nam Áo thun tay ngắn nam Áo thun tay ngắn nam Áo thun tay ngắn nam Áo thun tay ngắn nam Áo thun tay ngắn nam Áo thun tay ngắn nam Áo thun tay ngắn nam",
    product_color: "Đen",
    product_size: "L",
    product_price: 100000,
    product_image: "/aothun.jpg",
  },
  {
    product_id: "2",
    product_name: "Áo thun tay ngắn nam 1",
    product_color: "Đen",
    product_size: "L",
    product_price: 130000,
    product_image: "/aothun.jpg",
  },
  {
    product_id: "3",
    product_name: "Áo thun tay ngắn nam 3",
    product_color: "Đen",
    product_size: "L",
    product_price: 210000,
    product_image: "/aothun.jpg",
  },
];

export default function FavoriteProducts() {
    const [favorites, setFavorites] = useState(FAVORITE_PRODUCTS);

    const handleRemoveFavorite = (product_id) => {
        const updatedFavorites = favorites.filter(
          (item) => item.product_id !== product_id
        );
        setFavorites(updatedFavorites);
        console.log(favorites);
    }

  return (
    <div className="favorite-container">
      <Container>
        <div className="favorite-header">
          <div className="redirect">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Trang chủ
              </Link>
              <Link underline="hover" color="inherit" href="/product">
                Sản phẩm
              </Link>
              <Typography color="text.primary">Sản phẩm yêu thích</Typography>
            </Breadcrumbs>
          </div>
          <div className="favorite-page-header-title">
            <h1>Yêu thích</h1>
          </div>
        </div>
        {/* <!-------------------!> */}
        <div className="favorite-content">
          <div className="favorite-content-header">
            <span className="favorite-products-quantity">
              {favorites.length !== 0 ? favorites.length + ' sản phẩm' : 'Không có sản phẩm nào'}
            </span>
          </div>
          <Stack className="favorite-producs" >
            {favorites.map((item) => (
              <Link href='#' className="favorite-producs-item" key={item.product_id}>
                <Stack direction="row" spacing={6}>
                  <Image
                    src={item.product_image}
                    alt=""
                    width={100}
                    height={200}
                    className="favorite-product-image"
                  />
                  <Stack spacing={2} className="favorite-product-desc">
                    <span className="favorite-product-name">
                      {item.product_name}
                    </span>
                    <span className="favorite-product-color">
                      Màu sắc: {item.product_color}
                    </span>
                    <span className="favorite-product-size">
                      Kích cỡ: {item.product_size}
                    </span>
                    <span className="favorite-product-price">
                      {item.product_price}đ
                    </span>
                  </Stack>
                </Stack>
                <div className="favorite-control">
                  <Checkbox
                    checked
                    checkedIcon={<Favorite sx={{ color: "#f44336", fontSize:30 }} />}
                    onClick={() => handleRemoveFavorite(item.product_id)}
                  />
                </div>
              </Link>
            ))}
          </Stack>
        </div>
      </Container>
    </div>
  );
}
