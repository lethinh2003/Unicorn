"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { ConvertMoney } from "@/utils/convertMoney";
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
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import useGetListCart from "./useGetListCart";
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
    product_price: 102000.89,
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

  return (
    <Container sx={{ display: "block" }}>
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
            <h1>Giỏ hàng</h1>
            <div className="cart-left-panel-quantity">
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

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const inputTimeoutRef = useRef();
  const [quantityInput, setQuantityInput] = useState(item.data.quantities);
  const countInStock = item.data.product.product_sizes.find(
    (e) => e.size_type === item.data.size._id
  ).size_quantities;

  useEffect(() => {
    setQuantityInput(item.data.quantities);
    return () => {
      clearTimeout(inputTimeoutRef.current);
    };
  }, [item]);

  const updateQuanties = async ({
    cartItemId,
    productQuantitiesUpdate,
    data,
  }) => {
    const results = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/carts/cart-items/update-quantities`,
      {
        cartItemId,
        productQuantitiesUpdate,
      }
    );
    return results.data;
  };
  const mutationUpdateQuantities = useMutation({
    mutationFn: ({ type, quantities }) =>
      updateQuanties({
        cartItemId: item._id,
        productQuantitiesUpdate:
          type === "increase"
            ? item.data.quantities + 1
            : type === "decrease"
            ? item.data.quantities - 1
            : type === "input"
            ? quantities
            : item.data.quantities,
      }),
    onMutate: () => {
      dispatch(setIsLoading(true));
      const previousData = queryClient.getQueryData([
        "get-list-cart-items",
        session?.user?._id,
      ]);

      return { previousData };
    },
    onSuccess: (data, { type, quantities }) => {
      queryClient.setQueryData(
        ["get-list-cart-items", session?.user?._id],
        (oldData) => {
          if (oldData) {
            const getListCartItemsOld = oldData?.data || [];
            const updateListCartItems = getListCartItemsOld.map((e) => {
              if (e._id === item._id) {
                return {
                  ...e,
                  data: {
                    ...e.data,
                    quantities:
                      type === "increase"
                        ? e.data.quantities + 1
                        : type === "decrease"
                        ? e.data.quantities - 1
                        : type === "input"
                        ? quantities
                        : e.data.quantities,
                  },
                };
              } else {
                return e;
              }
            });
            return { ...oldData, data: updateListCartItems };
          } else {
            return oldData;
          }
        }
      );
    },
    onError: (err, _, context) => {
      const { data } = context.previousData;
      const findCurrentCartItem = data?.find((e) => e._id === item._id);
      setQuantityInput(findCurrentCartItem.data.quantities);
      queryClient.setQueryData(
        ["get-list-cart-items", session?.user?._id],
        context.previousData
      );
      toast.error(err?.response?.data?.message);
    },
    onSettled: () => {
      dispatch(setIsLoading(false));

      queryClient.invalidateQueries({
        queryKey: ["get-list-cart-items", session?.user?._id],
      });
    },
  });

  const removeCartItem = async ({ cartItemId }) => {
    const results = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/carts/cart-items/delete`,
      {
        cartItemId,
      }
    );
    return results.data;
  };
  const mutationRemoveCartItem = useMutation({
    mutationFn: () =>
      removeCartItem({
        cartItemId: item._id,
      }),
    onMutate: () => {
      dispatch(setIsLoading(true));

      const previousData = queryClient.getQueryData([
        "get-list-cart-items",
        session?.user?._id,
      ]);
      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["get-list-cart-items", session?.user?._id],
        (oldData) => {
          if (oldData) {
            const getListCartItemsOld = oldData?.data || [];
            const updateListCartItems = getListCartItemsOld.filter(
              (e) => e._id !== item._id
            );

            return { ...oldData, data: updateListCartItems };
          } else {
            return oldData;
          }
        }
      );
    },
    onError: (err, _, context) => {
      const { data } = context.previousData;
      queryClient.setQueryData(
        ["get-list-cart-items", session?.user?._id],
        context.previousData
      );
      toast.error(err?.response?.data?.message);
    },
    onSettled: () => {
      dispatch(setIsLoading(false));

      queryClient.invalidateQueries({
        queryKey: ["get-list-cart-items", session?.user?._id],
      });
    },
  });

  const handleIncreaseQuantity = () => {
    mutationUpdateQuantities.mutate({
      type: "increase",
    });
  };
  const handleDecreaseQuantity = () => {
    if (quantityInput === 1) {
      handleRemoveCartItem();
      return;
    }
    mutationUpdateQuantities.mutate({
      type: "decrease",
    });
  };
  const handleUpdateQuantity = (value) => {
    clearTimeout(inputTimeoutRef.current);
    setQuantityInput(value);
    inputTimeoutRef.current = setTimeout(() => {
      if (!value || value == 0) {
        handleRemoveCartItem();
        return;
      }
      mutationUpdateQuantities.mutate({
        type: "input",
        quantities: value,
      });
    }, 500);
  };

  const handleRemoveCartItem = () => {
    mutationRemoveCartItem.mutate();
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                position: "relative",
                width: "10rem",
                height: "10rem",
              }}
            >
              <Image
                src={item.data.product.product_images[0]}
                alt={item.data.product.product_name}
                width={1000}
                height={200}
                style={{
                  width: "100%",
                  objectFit: "contain",
                  height: "100%",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Link
                href={ROUTERS_PATH.DETAIL_PRODUCT.replace(
                  "{productId}",
                  item.data.product._id
                )}
              >
                <span
                  className="three-dots"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                  }}
                  title={item.data.product.product_name}
                >
                  {item.data.product.product_name}
                </span>
              </Link>
              <span style={{ fontSize: "1.3rem" }}>
                Màu: {item.data.product.product_color.product_color_name}
              </span>
              <span style={{ fontSize: "1.3rem" }}>
                Kích thước: {item.data.size.product_size_name}
              </span>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={handleRemoveCartItem}
              >
                [Xoá]
              </Typography>
            </Box>
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
              onClick={() => handleDecreaseQuantity()}
            >
              -
            </Button>
            <input
              type="number"
              onChange={(e) => handleUpdateQuantity(e.target.value)}
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
              value={quantityInput}
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
              onClick={() => handleIncreaseQuantity()}
            >
              +
            </Button>
          </div>
          <Typography
            sx={{
              fontSize: "1.3rem",
            }}
          >
            Trong kho còn {countInStock}
          </Typography>
        </TableCell>
        <TableCell align="center" sx={{ width: "10rem" }}>
          <ConvertMoney money={item.data.product.product_original_price} /> đ
        </TableCell>
        <TableCell align="center" sx={{ width: "15rem" }}>
          <ConvertMoney
            money={
              item.data.product.product_original_price * item.data.quantities
            }
          />{" "}
          đ
        </TableCell>
      </TableRow>
    </>
  );
};
