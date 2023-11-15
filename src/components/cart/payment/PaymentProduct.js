"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import { TYPE_VOUCHER_ITEM_DISPLAY } from "@/configs/config.vouchers";
import useGetInformationCart from "@/customHooks/useGetInformationCart";
import useGetListCart from "@/customHooks/useGetListCart";
import { ConvertMoney } from "@/utils/convertMoney";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import PaymentProductItem from "./PaymentProductItem";

function PaymentProduct() {
  const [deliveryFee, setDeliveryFee] = useState(30000);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const [voucherApply, setVoucherApply] = useState(null);

  const { data: dataListCartItems, isLoading: isLoadingGetListCartItems } =
    useGetListCart();

  const { data: dataCart, isLoading: isLoadingGetCart } =
    useGetInformationCart();
  useEffect(() => {
    let totalPrice = 0;
    dataListCartItems?.forEach((item) => {
      totalPrice +=
        item.data.product.product_original_price * item.data.quantities;
    });
    setTotalPrice(totalPrice);
  }, [dataListCartItems]);

  useEffect(() => {
    if (dataCart) {
      setVoucherApply(dataCart.voucher);
    }
  }, [dataCart]);
  useEffect(() => {
    if (voucherApply) {
      if (voucherApply.type === TYPE_VOUCHER_ITEM_DISPLAY.AMOUNT) {
        const { discount } = voucherApply;
        const totalDiscount = Math.round((totalPrice * discount) / 100);
        setTotal(totalPrice - totalDiscount + deliveryFee);
        setTotalPriceDiscount(totalDiscount);
      } else if (voucherApply.type === TYPE_VOUCHER_ITEM_DISPLAY.FREE_SHIP) {
        setTotalPriceDiscount(0);
        setTotal(totalPrice - 0 + deliveryFee);
      }
    } else {
      setTotal(totalPrice + deliveryFee);
      setTotalPriceDiscount(0);
    }
  }, [voucherApply, totalPrice]);

  return (
    <Stack
      className="divide-y divide-gray-200 drop-shadow-xl "
      sx={{
        backgroundColor: "#F7F7F7",
        // border: "0.1rem solid rgba(0, 0, 0, .125)",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <h2
        className="text-[2.5rem] font-bold"
        style={{
          padding: "2rem",
          borderBottom: ".1rem solid rgba(0, 0, 0, .125)",
          backgroundColor: "#EEEEEE",
        }}
      >
        Sản phẩm
      </h2>
      {isLoadingGetListCartItems && (
        <Box
          sx={{
            marginTop: "1rem",
          }}
        >
          <LoadingContent />
        </Box>
      )}
      <div
        className="flex flex-col"
        style={{
          overflowY: "auto",
          maxHeight: "80rem",
          marginTop: 0,
        }}
      >
        {dataListCartItems.map((item) => {
          return <PaymentProductItem item={item} key={item._id} />;
        })}
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1.5rem 2rem 0",
          }}
        >
          <div className="text-[1.8rem] font-medium">Tạm tính:</div>

          <div className="text-[1.8rem] font-semibold">
            <ConvertMoney money={totalPrice} />
          </div>
        </Stack>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1.5rem 2rem 0",
          }}
        >
          <div className="text-[1.8rem] font-medium">Phí vận chuyển:</div>
          <div className="text-[1.8rem] font-semibold">
            <ConvertMoney money={deliveryFee} />
          </div>
        </Stack>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1.5rem 2rem 0",
            borderTop: ".1rem solid rgba(0, 0, 0, .125)",
          }}
        >
          <div className="text-[1.8rem] font-medium">Mã giảm giá:</div>
          <div className="text-[1.8rem] font-semibold">
            {" "}
            -
            <ConvertMoney money={totalPriceDiscount} />
          </div>
        </Stack>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1.5rem 2rem",
            borderTop: ".1rem solid rgba(0, 0, 0, .125)",
          }}
        >
          <div className="text-[2rem] font-semibold">Tổng cộng:</div>
          <div className="text-[2rem] font-semibold">
            <ConvertMoney money={total} />
          </div>
        </Stack>
        <Stack direction="row"></Stack>
      </Stack>
    </Stack>
  );
}

export default PaymentProduct;
