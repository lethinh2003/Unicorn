import { ConvertMoney } from "@/utils/convertMoney";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export const AllProductItem = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.product_images[0]);
  return (
    <>
      <Stack
        className="products-item"
        sx={{
          cursor: "default",
        }}
      >
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
          src={mainImage}
          alt={product.product_name}
          width={500}
          height={500}
          className="product-item-image"
        />
        <div
          className="product-details"
          style={{
            gap: "1rem",
            height: "20rem",
          }}
        >
          <Link href={`/products/${product._id}`}>
            <span
              title={product.product_name}
              className="product-item-name cut-text"
            >
              {product.product_name}
            </span>
          </Link>

          <span className="product-item-price">
            {<ConvertMoney money={product.product_original_price} />}đ
          </span>
          <Box
            className="home-product__colors"
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div
              onClick={() => setMainImage(product.product_images[0])}
              style={{
                cursor: "pointer",
                border: "1px solid",
                width: "2rem",
                height: "2rem",
                marginRight: "1rem",
                marginTop: "1rem",
                backgroundColor: product?.product_color.product_color_code,
              }}
            ></div>
            {product?.child_products?.map((childProduct) => {
              return (
                <div
                  key={childProduct._id}
                  onClick={() => setMainImage(childProduct.product_images[0])}
                  style={{
                    cursor: "pointer",
                    border: "1px solid",
                    width: "2rem",
                    height: "2rem",
                    marginRight: "1rem",
                    marginTop: "1rem",
                    backgroundColor:
                      childProduct?.product_color.product_color_code,
                  }}
                ></div>
              );
            })}
          </Box>
        </div>
      </Stack>
    </>
  );
};
export const SkeletonAllProductItem = ({}) => {
  return (
    <>
      <Stack
        className="products-item"
        sx={{
          cursor: "default",

          maxWidth: "30rem",
          width: "100%",
        }}
      >
        <Skeleton
          variant="rectangular"
          height={250}
          sx={{
            width: "100%",
          }}
          className="product-item-image"
        />

        <div
          className="product-details"
          style={{
            gap: "1rem",
            height: "20rem",
          }}
        >
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", height: "7rem" }}
            className="product-item-name cut-text"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", width: "7rem", height: "3rem" }}
            className="product-item-price"
          />

          <Box
            className="home-product__colors"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {Array.from({ length: 5 }).map((_item, i) => (
              <Skeleton key={i} variant="rectangular" width={20} height={20} />
            ))}
          </Box>
        </div>
      </Stack>
    </>
  );
};

export const ProductItem = ({ product }) => {
  return (
    <>
      <Box className="home-product__items" style={{ position: "relative" }}>
        <img
          className="home-product__img"
          src={product?.product_images[0]}
        ></img>
        <Box
          sx={{
            margin: "1rem",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {product.product_name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600" }}
            gutterBottom
          >
            {<ConvertMoney money={product.product_original_price} />}đ
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
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <div
              style={{
                border: "1px solid",
                width: "2rem",
                height: "2rem",
                marginRight: "1rem",
                marginTop: "1rem",
                backgroundColor: product?.product_color.product_color_code,
              }}
            ></div>
            {product?.child_products?.map((childProduct) => {
              return (
                <div
                  key={childProduct._id}
                  style={{
                    border: "1px solid",
                    width: "2rem",
                    height: "2rem",
                    marginRight: "1rem",
                    backgroundColor:
                      childProduct?.product_color.product_color_code,
                  }}
                ></div>
              );
            })}
          </div>
        </Box>
      </Box>
    </>
  );
};
