"use client";
import CartInformation from "@/components/cart/CartInformation";
import CartItem from "@/components/cart/CartItem";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import { LoadingContent } from "@/components/generals/LoadingBox";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useGetListCart from "@/customHooks/useGetListCart";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Cart() {
  const router = useRouter();
  const {
    session,
    data: dataListCartItems,
    isLoading: isLoadingGetListCartItems,
    isFetching,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
  } = useGetListCart();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let totalPrice = 0;
    dataListCartItems.forEach((item) => {
      totalPrice +=
        item.data.product.product_original_price * item.data.quantities;
    });
    setTotalPrice(totalPrice);
  }, [dataListCartItems]);

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
        className="cart-container drop-shadow-xl"
        sx={{
          marginTop: "2rem",
          flexDirection: { xs: "column", md: "row" },
          height: "auto",
        }}
      >
        <Box
          className="cart-left-panel"
          sx={{
            width: { xs: "100%", md: "65%" },
          }}
        >
          <div className="cart-left-panel-header">
            <h1>Giỏ hàng</h1>
            <div className="cart-left-panel-quantity !text-[2rem]">
              {dataListCartItems.length} sản phẩm
            </div>
          </div>
          <div className="cart-left-panel-body">
            {isLoadingGetListCartItems && (
              <Box
                sx={{
                  marginTop: "1rem",
                }}
              >
                <LoadingContent />
              </Box>
            )}
            {!isLoadingGetListCartItems &&
              session &&
              dataListCartItems.length === 0 && (
                <div className="cart-empty">
                  <img src="./emptyCart.png" />
                  <p>Giỏ hàng của bạn đang trống</p>
                  <Button
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#FFFFFF",
                      backgroundColor: "#BFBBBB",
                      padding: "0.5rem 5rem",
                      "&:hover": {
                        color: "#FFFFFF",
                        backgroundColor: "#BFBBBB",
                        opacity: ".5",
                      },
                    }}
                    onClick={() => router.push(ROUTERS_PATH.HOME_PRODUCT)}
                  >
                    Mua ngay
                  </Button>
                </div>
              )}
            {!isLoadingGetListCartItems &&
              session &&
              dataListCartItems.length != 0 && (
                <TableContainer
                  sx={{
                    overflow: "auto",
                    maxHeight: "40rem",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "#f5f5f5",
                          boxShadow: "1px 0 2px var(--Black-Color)",
                          zIndex: 1,
                        }}
                      >
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="center">Đơn giá</TableCell>
                        <TableCell align="center" sx={{ width: "15rem" }}>
                          Tổng
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {dataListCartItems.map((item) => {
                        return <CartItem item={item} key={item._id} />;
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
          </div>
        </Box>
        <CartInformation dataListCartItems={dataListCartItems} />
      </Box>
    </Container>
  );
}

export default Cart;
