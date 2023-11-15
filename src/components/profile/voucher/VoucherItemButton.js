"use client";
import CART_MESSAGES from "@/configs/config.cart.messages";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";

export default function VoucherItemCopyButton({ voucher }) {
  const [value, copy] = useCopyToClipboard();

  return (
    <>
      <Button
        onClick={() =>
          toast.promise(copy(voucher.code), {
            loading: "Đang copy...",
            success: "Copy thành công " + voucher.code,
            error: <b>Không thể copy!</b>,
          })
        }
      >
        Copy
      </Button>
    </>
  );
}

export function VoucherItemChooseButton({
  voucher,
  dataListCartItems,
  totalPrice,
  setVoucherApply,
  voucherApply,
}) {
  const handleApplyVoucher = () => {
    if (voucher.min_order_quantity > dataListCartItems.length) {
      toast.error(CART_MESSAGES.MIN_ORDER_QUANTITY_VOUCHER_INVALID);
      return;
    }
    if (voucher.min_order_amount > totalPrice) {
      toast.error(CART_MESSAGES.MIN_ORDER_AMOUNT_VOUCHER_INVALID);
      return;
    }
    setVoucherApply(voucher);
    toast.success(CART_MESSAGES.APPLY_VOUCHER_SUCCESS);
  };

  const handleCancelApplyVoucher = () => {
    toast.success(CART_MESSAGES.CANCEL_APPLY_VOUCHER_SUCCESS);

    setVoucherApply(null);
  };
  return (
    <>
      {!voucherApply && <Button onClick={handleApplyVoucher}>Chọn</Button>}
      {voucherApply && (
        <Button
          sx={{
            backgroundColor: voucherApply._id === voucher._id && "#E74040",
            "&:hover": {
              backgroundColor: voucherApply._id === voucher._id && "#E74040",
            },
          }}
          onClick={
            voucherApply._id === voucher._id
              ? handleCancelApplyVoucher
              : handleApplyVoucher
          }
        >
          {voucherApply._id === voucher._id ? "Huỷ" : "Chọn"}
        </Button>
      )}
    </>
  );
}
