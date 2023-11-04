"use client";
import axios from "axios";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

export default function useGetListFavoriteProducts() {
  const ITEMS_OF_PAGE = 10;
  const getListFavoriteProducts = async (pageParam) => {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/favorite-products?page=${pageParam}&itemsOfPage=${ITEMS_OF_PAGE}`
    );
    return results.data;
  };

  const getListQuery = useInfiniteQuery(
    ["get-list-favorite-products"],
    ({ pageParam = 1 }) => getListFavoriteProducts(pageParam),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages[pages.length - 1].metadata.results === ITEMS_OF_PAGE) {
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = getListQuery;
  useEffect(() => {
    if (isError) {
      throw new Error(error);
    }
  }, [isError]);

  const countProducts = data?.pages?.flatMap((item) => item.data)?.length || 0;

  return {
    countProducts,
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
}
