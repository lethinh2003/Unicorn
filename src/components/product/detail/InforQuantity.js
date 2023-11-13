"use client";
import { TYPE_SET_PRODUCT_QUANTITY } from "@/configs/config.products";
import { Box, Typography } from "@mui/material";

export default function InforQuantity({
  dataProduct,
  productData,
  setProductData,
}) {
  const handleChangeQuantity = (value) => {
    let numberValue = value;
    setProductData((productData) => ({
      ...productData,
      quantity: numberValue,
    }));
  };
  const handleSetQuantity = (type) => {
    if (type === TYPE_SET_PRODUCT_QUANTITY.DECREASE) {
      if (productData.quantity === 0) {
        return;
      } else {
        setProductData((productData) => ({
          ...productData,
          quantity: productData.quantity - 1,
        }));
      }
    } else if (type === TYPE_SET_PRODUCT_QUANTITY.INCREASE) {
      setProductData((productData) => ({
        ...productData,
        quantity: productData.quantity + 1,
      }));
    }
  };

  return (
    <>
      {dataProduct && (
        <>
          <Typography
            sx={{
              fontSize: "2rem",
            }}
          >
            Số lượng:
          </Typography>
          <Box
            className="!border-gray-400"
            sx={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              border: "2px solid",
            }}
          >
            <Box
              onClick={() =>
                handleSetQuantity(TYPE_SET_PRODUCT_QUANTITY.DECREASE)
              }
              sx={{
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              -
            </Box>
            <input
              type="number"
              className="max-w-[5rem] border-gray-400 p-1 text-center text-base font-medium focus:outline-none md:p-2 md:text-base"
              value={productData.quantity}
              onWheel={(event) => event.currentTarget.blur()}
              onChange={(e) => handleChangeQuantity(e.target.value)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />

            <Box
              onClick={() =>
                handleSetQuantity(TYPE_SET_PRODUCT_QUANTITY.INCREASE)
              }
              sx={{
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              +
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
