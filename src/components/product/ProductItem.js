import { ConvertMoney } from "@/utils/convertMoney";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, Typography } from "@mui/material";
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

          <div className="home-product__colors" style={{ display: "flex" }}>
            <div
              style={{
                border: "1px solid",
                width: "2rem",
                height: "2rem",
                marginRight: "1rem",
                backgroundColor: product?.product_color.product_color_code,
              }}
            ></div>
            {product?.child_products?.map((childProduct) => {
              return (
                <div
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
