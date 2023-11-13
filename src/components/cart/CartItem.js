"use client";
import { TYPE_SET_PRODUCT_QUANTITY } from "@/configs/config.products";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import { setIsLoading } from "@/redux/actions/loadingBox";

import { ConvertMoney } from "@/utils/convertMoney";
import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import QuantityButton from "../button/QuantityButton";

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

  const handleSetQuantity = (type) => {
    if (type === TYPE_SET_PRODUCT_QUANTITY.DECREASE) {
      if (quantityInput === 1) {
        handleRemoveCartItem();
        return;
      }
      mutationUpdateQuantities.mutate({
        type: "decrease",
      });
    } else if (type === TYPE_SET_PRODUCT_QUANTITY.INCREASE) {
      mutationUpdateQuantities.mutate({
        type: "increase",
      });
    }
  };

  const handleChangeQuantity = (value) => {
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
                width={100}
                height={100}
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
                href={ROUTERS_PATH.HOME_PRODUCT + "/" + item.data.product._id}
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
              <div>
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    width: "fit-content",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={handleRemoveCartItem}
                >
                  [Xoá]
                </Typography>
              </div>
            </Box>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <QuantityButton
            quantity={quantityInput}
            handleChangeQuantity={handleChangeQuantity}
            handleSetQuantity={handleSetQuantity}
          />
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
export default CartItem;
