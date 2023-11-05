import { Box, Breadcrumbs, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Filter from "./Flter";
import Products from "./Products";

export const metadata = {
  title: "Danh sách sản phẩm",
  description: "Danh sách sản phẩm",
};

const getDataFilter = async ({ gender }) => {
  try {
    const getCategories = axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-categories?gender=${gender}`
    );
    const getColors = axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-colors`
    );
    const getSizes = axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-sizes`
    );
    const [categoriesData, colorsData, sizesData] = await Promise.all([
      getCategories,
      getColors,
      getSizes,
    ]);

    return [
      categoriesData.data.data,
      colorsData.data.data,
      sizesData.data.data,
    ];
  } catch (err) {
    throw err;
  }
};

export default async function ProductsPage({ searchParams }) {
  const { gender, category, color, size } = searchParams;

  if (!gender) {
    redirect("?gender=men");
  }
  const filterData = await getDataFilter({
    gender,
  });
  return (
    <div className="product-container">
      <div className="product-header">
        <div className="redirect">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Typography color="text.primary">
              {gender === "men" ? "Nam" : gender === "women" ? "Nữ" : ""}{" "}
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="product-page-title">
          <h1 className="product-page-title-text">
            Thời trang{" "}
            {gender === "men" ? "Nam" : gender === "women" ? "Nữ" : ""}{" "}
          </h1>
        </div>
      </div>
      <div className="header-image-container">
        <Image
          alt="Danh sách sản phẩm"
          src={gender === "men" ? "/maleProduct.jpg" : "/femaleProduct.png"}
          width={1000}
          height={500}
          className="header-image"
        />
      </div>
      <Box
        sx={{
          gap: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          className="product-filter"
          sx={{
            position: "sticky",
            left: 0,
          }}
        >
          <Filter
            filterData={filterData}
            category={category}
            color={color}
            size={size}
          />
        </Box>

        <Products />
      </Box>
    </div>
  );
}
