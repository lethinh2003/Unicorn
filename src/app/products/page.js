"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import { AllProductItem } from "@/components/product/ProductItem";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Filter from "./filter";
const ITEMS_OF_PAGE = 50;
export default function Products() {
  const searchParams = useSearchParams();
  const searchColor = searchParams.get("color");
  const searchSize = searchParams.get("size");
  const searchCategory = searchParams.get("category");
  const searchGender = searchParams.get("gender");
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_OF_PAGE);
  const [scrollY, setScrollY] = useState(0);

  const [filterValue, setFilterValue] = useState({
    category: "all",
    color: "all",
    size: "all",
    gender: "unisex",
  });

  const getListProducts = async (pageParam) => {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/products?category=${filterValue.category}&gender=${filterValue.gender}&size=${filterValue.size}&color=${filterValue.color}&page=${pageParam}&itemsOfPage=${itemsPerPage}`
    );
    return results.data;
  };

  const getListQuery = useInfiniteQuery(
    ["get-list-product", filterValue],
    ({ pageParam = 1 }) => getListProducts(pageParam),
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

  // handle merge child product to parent product
  const products = dataProducts?.pages.flatMap((page) => page.data) || [];
  const finalProducts = [];
  const objMapProducts = _.keyBy(products, "_id");
  for (const product of products) {
    if (filterValue.color !== "all") {
      finalProducts.push(product);
    } else {
      if (!product.parent_product_id) {
        finalProducts.push(product);
      } else {
        // find Parent Product
        const parentProduct = objMapProducts[product.parent_product_id];
        if (parentProduct) {
          if (!parentProduct.child_products) {
            parentProduct.child_products = [];
          } else {
            parentProduct.child_products.push(product);
          }
          parentProduct.child_products = _.uniqBy(
            parentProduct.child_products,
            "_id"
          );
        }
      }
    }
  }

  return (
    <div className="product-container">
      <div className="product-header">
        <div className="redirect">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Typography color="text.primary">
              {searchGender === "men"
                ? "Nam"
                : searchGender === "women"
                ? "Nữ"
                : ""}{" "}
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="product-page-title">
          <h1 className="product-page-title-text">
            Thời trang{" "}
            {searchGender === "men"
              ? "Nam"
              : searchGender === "women"
              ? "Nữ"
              : ""}{" "}
          </h1>
        </div>
      </div>
      <div className="header-image-container">
        <Image
          alt=""
          src="/maleProduct.jpg"
          width={1000}
          height={500}
          className="header-image"
        />
      </div>
      <Stack direction="row" className="product-page-body">
        <div className="product-filter">
          <Filter></Filter>
        </div>
        <div className="product-item-container">
          <div className="products-page-header">
            <span className="products-page-header-title">
              Danh sách sản phẩm
            </span>
          </div>
          <Grid container className="products-item-wrap">
            {isLoadingQuery && !isFetchingNextPage && (
              <Box
                sx={{
                  paddingTop: "5rem",
                  width: "100%",
                }}
              >
                <LoadingContent />
              </Box>
            )}

            {finalProducts.map((product) => (
              <AllProductItem key={product._id} product={product} />
            ))}
          </Grid>

          {/* <div className="viewmore">
            <Button className="viewmore-button">Xem thêm</Button>
          </div> */}

          {isFetchingNextPage && <LoadingContent />}
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
      </Stack>
    </div>
  );
}
