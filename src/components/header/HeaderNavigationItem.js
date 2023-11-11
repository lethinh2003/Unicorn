"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

const HeaderNavigationItem = ({ GENDER }) => {
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
                      `${ROUTERS_PATH.HOME_PRODUCT}?gender=${GENDER}&category=${category._id}`
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
                        `${ROUTERS_PATH.HOME_PRODUCT}?gender=${GENDER}&category=${child_categories._id}`
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
};
export default HeaderNavigationItem;
