"use client";
import {
  AllProductItem,
  SkeletonAllProductItem,
} from "@/components/product/ProductItem";
import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
const ITEMS_OF_PAGE = 20;
export default function Products() {
  const searchParams = useSearchParams();
  const searchColor = searchParams.get("color");
  const searchSize = searchParams.get("size");
  const searchCategory = searchParams.get("category");
  const searchGender = searchParams.get("gender");
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_OF_PAGE);

  const [filterValue, setFilterValue] = useState({
    color: !searchColor ? "all" : searchColor,
    size: !searchSize ? "all" : searchSize,
    category: !searchCategory ? "all" : searchCategory,
    gender: !searchGender ? "unisex" : searchGender,
  });

  const getListProducts = async (pageParam, filterValue) => {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/products?category=${filterValue.category}&gender=${filterValue.gender}&size=${filterValue.size}&color=${filterValue.color}&page=${pageParam}&itemsOfPage=${itemsPerPage}`
    );
    return results.data;
  };

  const getListQuery = useInfiniteQuery(
    ["get-list-product", filterValue],
    ({ pageParam = 1 }) => getListProducts(pageParam, filterValue),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages[pages.length - 1].metadata.results === itemsPerPage) {
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );
  const {
    data: dataProducts,
    status,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = getListQuery;
  useEffect(() => {
    if (isErrorQuery) {
      throw error;
    }
  }, [isErrorQuery]);

  useEffect(() => {
    setFilterValue((value) => ({
      ...value,
      color: !searchColor ? "all" : searchColor,
      size: !searchSize ? "all" : searchSize,
      category: !searchCategory ? "all" : searchCategory,
      gender: !searchGender ? "unisex" : searchGender,
    }));
  }, [searchColor, searchSize, searchCategory, searchGender]);

  return (
    <div
      className="product-item-container"
      style={{
        flex: 1,
      }}
    >
      <div className="products-page-header">
        <span className="products-page-header-title">Danh sách sản phẩm</span>
      </div>
      <Grid
        container
        className="products-item-wrap"
        sx={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0,1fr))",
            sm: "repeat(2, minmax(0,1fr))",
            md: "repeat(3, minmax(0,1fr))",
          },
        }}
      >
        {isLoadingQuery && !isFetchingNextPage && (
          <>
            {Array.from({ length: 5 }).map((_item, i) => (
              <SkeletonAllProductItem key={i} />
            ))}
          </>
        )}
        {dataProducts?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.data.map((product) => (
              <AllProductItem key={product._id} product={product} />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage && (
          <>
            {Array.from({ length: 5 }).map((_item, i) => (
              <SkeletonAllProductItem key={i} />
            ))}
          </>
        )}
      </Grid>

      {hasNextPage && !isFetchingNextPage && (
        <Box
          sx={{
            paddingTop: "10px",
            textAlign: "center",
          }}
        >
          <Button variant="contained" onClick={() => fetchNextPage()}>
            Tải thêm
          </Button>
        </Box>
      )}
    </div>
  );
}
