"use client";
import CartInformation from "@/components/cart/CartInformation";
import ListCartItems from "@/components/cart/ListCartItems";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useGetListCart from "@/customHooks/useGetListCart";
import { Box, Container } from "@mui/material";

function Cart() {
  const {
    session,
    data: dataListCartItems,
    isLoading: isLoadingGetListCartItems,
  } = useGetListCart();

  const DATA_BREADCRUMB = [
    {
      title: "Giỏ hàng",
      link: ROUTERS_PATH.CART,
    },
  ];

  return (
    <Container sx={{ display: "block" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>
      <Box
        className="cart-container shadow-xl"
        sx={{
          marginTop: "2rem",
          flexDirection: { xs: "column", md: "row" },
          height: "auto",
        }}
      >
        <ListCartItems
          dataListCartItems={dataListCartItems}
          session={session}
          isLoadingGetListCartItems={isLoadingGetListCartItems}
        />
        <CartInformation dataListCartItems={dataListCartItems} />
      </Box>
    </Container>
  );
}

export default Cart;
