"use client";
import CartItem from "@/components/cart/CartItem";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import { LoadingContent } from "@/components/generals/LoadingBox";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useGetListCart from "@/customHooks/useGetListCart";
import { ConvertMoney } from "@/utils/convertMoney";
import {
  Box,
  Button,
  Container,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";

function Cart() {
  const Router = useRouter();
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
                    onClick={() => Router.push(ROUTERS_PATH.HOME_PRODUCT)}
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
                {(() => {
                  let totalPrice = 0;
                  dataListCartItems.forEach((item) => {
                    totalPrice +=
                      item.data.product.product_original_price *
                      item.data.quantities;
                  });
                  return <ConvertMoney money={totalPrice} />;
                })()}{" "}
                đ
              </div>
            </div>
            <div
              className="cart-right-panel-sale-offs"
              style={{ paddingTop: 0 }}
            >
              <div className="cart-right-panel-sale-off">Giảm giá:</div>
              <div className="cart-right-panel-sale-off-price">0 đ</div>
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
              disableUnderline={true}
              className="cart-right-panel-voucher"
              placeholder="Mã giảm giá"
            />
            <Button
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
              <div className="cart-right-panel-total-price">0 đ</div>
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
      </Box>
    </Container>
  );
}

export default Cart;
