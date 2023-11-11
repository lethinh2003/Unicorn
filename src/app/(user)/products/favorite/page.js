"use client";
import LoadMoreButton from "@/components/button/LoadMoreButton";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import FavoriteItem, {
  FavoriteItemLoading,
} from "@/components/product/favorite/FavoriteItem";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useGetListFavoriteProducts from "@/customHooks/useGetListFavoriteProducts";
import { Box, Stack } from "@mui/material";
import { Fragment } from "react";
export default function FavoriteProducts() {
  const {
    countAllProducts,
    data: dataProducts,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListFavoriteProducts();

  const DATA_BREADCRUMB = [
    {
      title: "Sản phẩm",
      link: ROUTERS_PATH.HOME_PRODUCT,
    },
    {
      title: "Sản phẩm yêu thích",
    },
  ];

  return (
    <div className="favorite-container">
      <Box>
        <div className="favorite-header">
          <BreadcrumbBar data={DATA_BREADCRUMB} />
          <div className="favorite-page-header-title">
            <h1>Yêu thích</h1>
          </div>
        </div>

        <div className="favorite-content">
          <div className="favorite-content-header">
            <span className="favorite-products-quantity">
              {countAllProducts !== 0
                ? countAllProducts + " sản phẩm"
                : "Không có sản phẩm nào"}
            </span>
          </div>
          <Stack className="favorite-producs">
            {isLoadingQuery && !isFetchingNextPage && (
              <>
                {Array.from({ length: 5 }).map((_item, i) => (
                  <FavoriteItemLoading key={i} />
                ))}
              </>
            )}
            {dataProducts?.pages.map((group, i) => (
              <Fragment key={i}>
                {group.data.map((item) => (
                  <FavoriteItem key={item._id} product={item.product_id} />
                ))}
              </Fragment>
            ))}
          </Stack>
        </div>
        {hasNextPage && (
          <LoadMoreButton
            isLoading={isFetchingNextPage}
            onClick={fetchNextPage}
          />
        )}
      </Box>
    </div>
  );
}
