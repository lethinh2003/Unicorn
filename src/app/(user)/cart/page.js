"use client";
import LoadingBox from "@/components/generals/LoadingBox";
import USER_MESSAGES from "@/configs/config.users.messages";
import useAuth from "@/customHooks/useAuth";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Input,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
//fake data san pham
const PRODUCTS_CART = [
  {
    product_id: "1",
    product_name: "Áo thun tay ngắn nam",
    product_color: "Đen",
    product_size: "L",
    product_quantities: 100,
    product_price: 200000,
    product_image:
      "https://tse2.mm.bing.net/th?id=OIP.jvlty0y7lA8IR-8vKV57ygHaJQ&pid=Api&P=0&h=220",
  },
  {
    product_id: "2",
    product_name: "Áo thun tay ngắn nam",
    product_color: "Đen",
    product_size: "L",
    product_quantities: 2,
    product_price: 100000,
    product_image:
      "https://tse2.mm.bing.net/th?id=OIP.jvlty0y7lA8IR-8vKV57ygHaJQ&pid=Api&P=0&h=220",
  },
  {
    product_id: "3",
    product_name: "Áo thun tay ngắn nam",
    product_color: "Đen",
    product_size: "L",
    product_quantities: 2,
    product_price: 100000,
    product_image:
      "https://tse2.mm.bing.net/th?id=OIP.jvlty0y7lA8IR-8vKV57ygHaJQ&pid=Api&P=0&h=220",
  },
  {
    product_id: "4",
    product_name: "Áo thun tay ngắn nam",
    product_color: "Đen",
    product_size: "L",
    product_quantities: 2,
    product_price: 100000,
    product_image:
      "https://tse2.mm.bing.net/th?id=OIP.jvlty0y7lA8IR-8vKV57ygHaJQ&pid=Api&P=0&h=220",
  },
  {
    product_id: "5",
    product_name: "Áo thun tay ngắn nam",
    product_color: "Đen",
    product_size: "L",
    product_quantities: 2,
    product_price: 100000,
    product_image:
      "https://tse2.mm.bing.net/th?id=OIP.jvlty0y7lA8IR-8vKV57ygHaJQ&pid=Api&P=0&h=220",
  },
];

function Cart() {
  const { isAuthenticated } = useAuth();

  const [products, setProducts] = useState(PRODUCTS_CART);
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const handleContinue = () => {
    // Check if user doesn not login -> require login
    if (!isAuthenticated) {
      toast.error(USER_MESSAGES.USER_UNAUTHENTICATED);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    Router.push("/cart/payment");
  };

  const handleChangeQuantity = (value = 0, product_id = 0) => {
    const newProducts = [...products];
    if (value <= 0 && value !== "") {
      newProducts.forEach((item) => {
        if (item.product_id === product_id) {
          setProducts(
            newProducts.filter((item) => item.product_id !== product_id)
          );
        }
      });
    } else {
      newProducts.forEach((item) => {
        if (item.product_id === product_id) {
          item.product_quantities = value;
        }
      });
      setProducts(newProducts);
    }
  };

  const handleIncrease = (product_id) => {
    const newProducts = [...products];
    newProducts.forEach((item) => {
      if (item.product_id === product_id) {
        item.product_quantities++;
      }
    });
    setProducts(newProducts);
  };

  const handleDecrease = (product_id) => {
    const newProducts = [...products];
    newProducts.forEach((item) => {
      if (item.product_id === product_id) {
        if (item.product_quantities > 1) {
          item.product_quantities--;
          setProducts(newProducts);
        } else {
          setProducts(
            newProducts.filter((item) => item.product_id !== product_id)
          );
        }
      }
    });
  };

  return (
    <Container sx={{ display: "block" }}>
      <LoadingBox isLoading={isLoading} />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="redirect">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Typography color="text.primary">Giỏ hàng</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <Box
        className="cart-container"
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
            <div className="cart-left-panel-title">Giỏ hàng</div>
            <div className="cart-left-panel-quantity">
              {products.length} sản phẩm
            </div>
          </div>
          <div className="cart-left-panel-body">
            {products.length === 0 ? (
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
                  onClick={() => Router.push("/")}
                >
                  Mua ngay
                </Button>
              </div>
            ) : (
              <TableContainer
                sx={{
                  overflowY: "scroll",
                  maxHeight: "40rem",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
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
                    {products.map((item) => {
                      return (
                        <TableRow key={item.product_id}>
                          <TableCell>
                            <Stack direction="row" spacing={2}>
                              <img
                                src={item.product_image}
                                style={{
                                  width: "10rem",
                                  height: "10rem",
                                  objectFit: "fill",
                                }}
                              />
                              <Stack spacing={3}>
                                <span
                                  style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  {item.product_name}
                                </span>
                                <span style={{ fontSize: "1.3rem" }}>
                                  Màu: {item.product_color}
                                </span>
                                <span style={{ fontSize: "1.3rem" }}>
                                  Kích thước: {item.product_size}
                                </span>
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                sx={{
                                  border: ".1rem solid #787474",
                                  minWidth: "1rem",
                                  minHeight: "1rem",
                                  height: "3rem",
                                  width: "3rem",
                                  backgroundColor: "#D9D9D9",
                                  color: "#787474",
                                  "&:hover": {
                                    backgroundColor: "#D9D9D9",
                                    opacity: ".5",
                                  },
                                }}
                                onClick={() => handleDecrease(item.product_id)}
                              >
                                -
                              </Button>
                              <input
                                type="number"
                                onChange={(e) =>
                                  handleChangeQuantity(
                                    e.target.value,
                                    item.product_id
                                  )
                                }
                                disableUnderline={true}
                                style={{
                                  backgroundColor: "#D9D9D9",
                                  border: ".1rem solid #787474",
                                  minWidth: "3rem",
                                  minHeight: "3rem",
                                  height: "3rem",
                                  width: "5rem",
                                  padding: "0 .5rem",
                                  fontWeight: 800,
                                  textAlign: "center",
                                  color: "#787474",
                                }}
                                value={item.product_quantities}
                              ></input>
                              <Button
                                sx={{
                                  border: ".1rem solid #787474",
                                  minWidth: "3rem",
                                  minHeight: "3rem",
                                  height: "3rem",
                                  width: "3rem",
                                  backgroundColor: "#D9D9D9",
                                  color: "#787474",
                                  "&:hover": {
                                    backgroundColor: "#D9D9D9",
                                    opacity: ".5",
                                  },
                                }}
                                onClick={() => handleIncrease(item.product_id)}
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell align="center" sx={{ width: "10rem" }}>
                            {item.product_price.toLocaleString("vi-VN")}đ
                          </TableCell>
                          <TableCell align="center" sx={{ width: "15rem" }}>
                            {(
                              item.product_price * item.product_quantities
                            ).toLocaleString("vi-VN")}
                            đ
                          </TableCell>
                        </TableRow>
                      );
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
            <div className="cart-right-panel-title" style={{ color: "#fff" }}>
              Tổng đơn
            </div>
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
                  products.forEach((item) => {
                    totalPrice += item.product_price * item.product_quantities;
                  });
                  return totalPrice.toLocaleString("vi-VN");
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
              onClick={() => handleContinue()}
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
