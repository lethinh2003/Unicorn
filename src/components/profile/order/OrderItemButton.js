"use client";
import { ORDER_DELIVERY_STATUSES } from "@/configs/config.orders";
import { Box, Button } from "@mui/material";

export default function OrderItemButton({ item }) {
  const renderButton = () => {
    switch (item.order_status) {
      case ORDER_DELIVERY_STATUSES.PAYMENT_PENDING:
        return (
          <>
            <Button>Hủy đơn</Button>
          </>
        );
      case ORDER_DELIVERY_STATUSES.PENDING:
        return (
          <>
            <Button>Hủy đơn</Button>
          </>
        );
      case ORDER_DELIVERY_STATUSES.DELIVERING:
        return (
          <>
            <Button>Hủy đơn</Button>
          </>
        );
      case ORDER_DELIVERY_STATUSES.DELIVERED:
        return (
          <>
            <Button>Mua lại</Button>
            <Button>Đánh giá</Button>
          </>
        );
      case ORDER_DELIVERY_STATUSES.CANCELLED:
        return (
          <>
            <Button>Mua lại</Button>
          </>
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
        }}
      >
        {renderButton()}
      </Box>
    </>
  );
}
