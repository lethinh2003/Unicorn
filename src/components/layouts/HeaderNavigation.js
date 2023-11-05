"use client";
import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

export default function HeaderNavigation() {
  const [isMenHover, setIsMenHover] = useState(false);
  const [isWomenHover, setIsWomenHover] = useState(false);

  const handleMenMouseEnter = () => {
    setIsMenHover(true);
  };

  const handleMenMouseLeave = () => {
    setIsMenHover(false);
  };

  const handleWomenMouseEnter = () => {
    setIsWomenHover(true);
  };

  const handleWomenMouseLeave = () => {
    setIsWomenHover(false);
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          textTransform: "uppercase",
          fontSize: "1.8rem",
          marginTop: "0.5rem",
          gap: "2rem",
          flex: 1,
        }}
      >
        <Box
          sx={{
            paddingLeft: "2rem",
            cursor: "pointer",
          }}
          onMouseEnter={handleMenMouseEnter}
          onMouseLeave={handleMenMouseLeave}
        >
          <Stack>
            <Link href="/products?gender=men">
              <span className="category-gender-button">Nam</span>
            </Link>
            <div className="header-men-categories">
              {isMenHover && <HeaderNavigationItem GENDER="men" />}
            </div>
          </Stack>
        </Box>
        <Box
          sx={{
            paddingLeft: "3rem",
            cursor: "pointer",
          }}
          onMouseEnter={handleWomenMouseEnter}
          onMouseLeave={handleWomenMouseLeave}
        >
          <Link href="/products?gender=women">
            <span className="category-gender-button">Nữ</span>
          </Link>
          <div className="header-women-categories">
            {isWomenHover && <HeaderNavigationItem GENDER="women" />}
          </div>
        </Box>
        <Box
          sx={{
            paddingLeft: "3rem",
            color: "primary.main",
          }}
        >
          Best Seller
        </Box>
        <Box
          sx={{
            paddingLeft: "3rem",
            color: "primary.main",
          }}
        >
          Sale
        </Box>
      </Box>
    </>
  );
}
function HeaderNavigationItem({ GENDER }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
  const getCategories = async (gender) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-categories?gender=${gender}`
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };
  const { data, isLoading, isError } = useQuery(
    ["categories", GENDER],
    () => getCategories(GENDER),
    {
      staleTime: Infinity,
    }
  );

  if (isLoading)
    return (
      <div className="header-navigation-container">
        <Box
          sx={{
            backgroundColor: "#fff",
            maxWidth: "100vw",
            paddingLeft: 5,
            textAlign: "center",
            position: "relative",
          }}
          onMouseLeave={handleMouseLeave}
        >
          <CircularProgress color="inherit" className="loading-progress" />
        </Box>
      </div>
    );

  return (
    <div className="header-navigation-container">
      <Box
        sx={{
          backgroundColor: "#fff",
          height: "70vh",
          maxWidth: "100vw",
          overflowY: "auto",
          paddingLeft: 5,
        }}
        onMouseLeave={handleMouseLeave}
      >
        <Grid container spacing={1}>
          {data?.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <List>
                <span
                  className="category-name"
                  onClick={() => {
                    router.push(
                      `/products?gender=${GENDER}&category=${category._id}`
                    );
                  }}
                >
                  {category.product_category_name}
                </span>

                {category.child_categories?.map((child_categories) => (
                  <ListItemButton
                    sx={{
                      "&:hover > .child-category-name": {
                        color: "#38ac8f",
                      },
                    }}
                    key={child_categories._id}
                    onClick={() => {
                      router.push(
                        `/products?gender=${GENDER}&category=${child_categories._id}`
                      );
                    }}
                  >
                    <ListItemText
                      primary={child_categories.product_category_name}
                      sx={{
                        textTransform: "none",
                        width: "100%",
                      }}
                      className="child-category-name"
                    />
                  </ListItemButton>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
