"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Stack,
  Grid,
  ListItemButton,
  List,
  ListItemText,
  Backdrop,
  CircularProgress,
  Box,
  
} from "@mui/material";

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

export default function HeaderNavigation({ GENDER }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };
  const { data, isLoading, isError } = useQuery(["categories", GENDER], () =>
    getCategories(GENDER)
  );

  if (isLoading) return (
    <div className="header-navigation-container">
      <Box
        sx={{
          backgroundColor: "#fff",
          maxWidth: "100vw",
          paddingLeft: 5,
          textAlign: "center",
          position: "relative"
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
            paddingLeft:5,
          }}
          onMouseLeave={handleMouseLeave}
        >
          <Grid container spacing={1}>
            {data?.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category._id}>
                <List className="category-item">
                  <span className="category-name">{category.product_category_name}</span>
                  {category.child_categories?.map((child_categories) => (
                    <ListItemButton
                      key={child_categories._id}
                    >
                      <ListItemText
                        primary={child_categories.product_category_name}
                        sx={{
                          textTransform: "none",
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
