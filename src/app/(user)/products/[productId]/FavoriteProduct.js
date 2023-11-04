"use client";
import LoadingBox from "@/components/generals/LoadingBox";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "@/redux/actions/favoriteProducts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function FavoriteProduct({ dataProduct }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { data: dataFavoriteProducts } = useSelector(
    (state) => state.favoriteProducts
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIsLikedProduct = dataFavoriteProducts.find(
      (item) => item._id.toString() === dataProduct._id.toString()
    );
    setIsFavorite(checkIsLikedProduct);
  }, [dataFavoriteProducts, dataProduct]);

  const handleClickFavoriteProduct = async ({ type = "like" }) => {
    try {
      if (!isAuthenticated) {
        return router.push(ROUTERS_PATH.SIGN_IN);
      }
      setIsLoading(true);
      let res;
      if (type === "like") {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products`,
          {
            productId: dataProduct._id,
          }
        );
        // Add product to favorite products redux
        dispatch(
          addFavoriteProduct({
            product: { _id: dataProduct._id },
          })
        );
      } else if (type === "unlike") {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products/unlike`,
          {
            productId: dataProduct._id,
          }
        );
        // Remove product to favorite products redux
        dispatch(
          removeFavoriteProduct({
            product: { _id: dataProduct._id },
          })
        );
      }
      toast.success(res.data.message);
    } catch (err) {
      if (err && err.response) {
        toast.error(`Message: ${err.response?.data?.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingBox isLoading={isLoading} />

      {!isFavorite && (
        <FavoriteBorderOutlinedIcon
          onClick={() => handleClickFavoriteProduct({ type: "like" })}
          sx={{
            cursor: "pointer",
            fontSize: "3rem",
          }}
        />
      )}
      {isFavorite && (
        <FavoriteIcon
          onClick={() => handleClickFavoriteProduct({ type: "unlike" })}
          sx={{
            cursor: "pointer",
            color: "#f44336",
            fontSize: "3rem",
          }}
        />
      )}
    </>
  );
}
