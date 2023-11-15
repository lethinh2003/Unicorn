"use client";
import { TYPE_VOUCHER_ITEM_DISPLAY } from "@/configs/config.vouchers";
import { ConvertMoney } from "@/utils/convertMoney";
import { Box, Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import CartVoucherModal from "./CartVoucherModal";

function CartInformation({ dataListCartItems }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const [voucherApply, setVoucherApply] = useState(null);

  const [isOpenModalVoucher, setIsOpenModalVoucher] = useState(false);
  useEffect(() => {
    let totalPrice = 0;
    dataListCartItems?.forEach((item) => {
      totalPrice +=
        item.data.product.product_original_price * item.data.quantities;
    });
    setTotalPrice(totalPrice);
  }, [dataListCartItems]);

  useEffect(() => {
    if (voucherApply) {
      if (voucherApply.type === TYPE_VOUCHER_ITEM_DISPLAY.AMOUNT) {
        const { discount } = voucherApply;
        const totalDiscount = Math.round((totalPrice * discount) / 100);
        setTotal(totalPrice - totalDiscount);
        setTotalPriceDiscount(totalDiscount);
      } else if (voucherApply.type === TYPE_VOUCHER_ITEM_DISPLAY.FREE_SHIP) {
        setTotalPriceDiscount(0);
        setTotal(totalPrice - 0);
      }
      setIsOpenModalVoucher(false);
    } else {
      setTotal(totalPrice);
      setTotalPriceDiscount(0);
    }
  }, [voucherApply, totalPrice]);

  const handleRenderVoucherUI = () => {
    if (!voucherApply) {
      return "0 đ";
    }
    if (voucherApply.type === TYPE_VOUCHER_ITEM_DISPLAY.AMOUNT) {
      return <ConvertMoney money={totalPriceDiscount} />;
    }
    if (voucherApply.type === TYPE_VOUCHER_ITEM_DISPLAY.FREE_SHIP) {
      return "Free ship";
    }
  };

  return (
    <>
      <CartVoucherModal
        isOpen={isOpenModalVoucher}
        setIsOpen={setIsOpenModalVoucher}
        dataListCartItems={dataListCartItems}
        totalPrice={totalPrice}
        voucherApply={voucherApply}
        setVoucherApply={setVoucherApply}
      />
      <Box
        className="cart-right-panel"
        sx={{
          width: "100%",
          flex: 1,
        }}
      >
        <div className="cart-right-panel-header">
          <Box
            className="cart-right-panel-title"
            sx={{ color: "#fff", fontSize: "3rem" }}
          >
            Tổng đơn
          </Box>
        </div>
        <div
          className="cart-right-panel-body"
          style={{
            borderBottom: ".1rem solid var(--Border-Taupe-Color)",
            paddingBottom: "3rem",
          }}
        >
          <div className="cart-right-panel-merchandises">
            <div className="cart-right-panel-merchandise">Tiền hàng:</div>
            <div className="cart-right-panel-price">
              <ConvertMoney money={totalPrice} />
            </div>
          </div>
          <div className="cart-right-panel-sale-offs" style={{ paddingTop: 0 }}>
            <div className="cart-right-panel-sale-off">Giảm giá:</div>
            <div className="cart-right-panel-sale-off-price">
              {handleRenderVoucherUI()}
            </div>
          </div>

          <Input
            style={{
              backgroundColor: "#fff",
              border: "none",
              outline: "none",
              width: "100%",
              padding: "0.5rem",
              margin: "5rem 0 2rem",
            }}
            value={voucherApply?.code || "Mã giảm giá"}
            disabled
            disableUnderline={true}
            className="cart-right-panel-voucher divide-y divide-gray-200 drop-shadow-xl"
            placeholder="Mã giảm giá"
          />
          <Button
            onClick={() => setIsOpenModalVoucher(true)}
            sx={{
              backgroundColor: "#E74040",
              color: "#FFFFFF",
              padding: "0.5rem 2rem",
              alignSelf: "flex-start",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#E74040",
                filter: "brightness(1.5)",
              },
            }}
          >
            CHỌN MÃ
          </Button>
        </div>
        <div className="cart-right-panel-footer">
          <div className="cart-right-panel-totals">
            <div className="cart-right-panel-total">Thành tiền:</div>
            <div className="cart-right-panel-total-price">
              <ConvertMoney money={total} />
            </div>
          </div>
          <Button
            sx={{
              backgroundColor: "#E74040",
              color: "#FFFFFF",
              padding: "0.5rem 2rem",
              width: "100%",
              marginTop: "2rem",
              "&:hover": {
                color: "#FFFFFF",
                backgroundColor: "#E74040",
                filter: "brightness(1.5)",
              },
            }}
          >
            Tiếp tục
          </Button>
        </div>
      </Box>
    </>
  );
}

export default CartInformation;
