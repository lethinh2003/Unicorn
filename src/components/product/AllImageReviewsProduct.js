"use client";
import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import ReviewItem, { ReviewItemLoading } from "./ReviewItem";
const ITEMS_OF_PAGE = 10;
export default function AllImageReviewsProducts({ productId, filter }) {
  const { sort, rating } = filter;
  const getListReviews = async (pageParam) => {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/products/reviews?productId=${productId}&page=${pageParam}&itemsOfPage=${ITEMS_OF_PAGE}&sort=${sort}&rating=${rating}&type=image`
    );
    return results.data;
  };

  const getListQuery = useInfiniteQuery(
    ["get-list-images-reviews-product", productId, filter],
    ({ pageParam = 1 }) => getListReviews(pageParam),
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
    data: dataReviews,
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

  return (
    <>
      <Stack>
        {isLoadingQuery && !isFetchingNextPage && (
          <>
            {Array.from({ length: 5 }).map((_item, i) => (
              <ReviewItemLoading />
            ))}
          </>
        )}
        {dataReviews?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.data.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage && (
          <>
            {Array.from({ length: 5 }).map((_item, i) => (
              <ReviewItemLoading />
            ))}
          </>
        )}
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
      </Stack>
    </>
  );
}
