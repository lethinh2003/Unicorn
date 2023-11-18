"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
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
import Image from "next/image";
import Slide from "@mui/material/Slide";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

const HeaderMobileNavigationItem = ({ GENDER }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
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
  const handleCategoryClick = (category) => {
    if (category.child_categories && category.child_categories.length > 0) {
      setParentCategories([...parentCategories, selectedCategory]);
      setSelectedCategory(category);
    } else {
      router.push(
        `${ROUTERS_PATH.HOME_PRODUCT}?gender=${GENDER}&category=${category._id}`
      );
    }
  };

  const handleBackButtonClick = () => {
    const lastParent = parentCategories.pop();
    setSelectedCategory(lastParent);
    setParentCategories([...parentCategories]);
  };
  const { data, isLoading, isError } = useQuery(
    ["categories", GENDER],
    () => getCategories(GENDER),
    {
      staleTime: Infinity,
    }
  );
  const renderCategoryList = (categories) => {
    return (
      <Slide
        direction={selectedCategory ? 'left' : 'right'}
        in={true}
        mountOnEnter
        unmountOnExit
      >
        <Grid
          container
          spacing={1}
          columns={{ xs: 12, sm: 12, md: 20 }}
          sx={{ width: "100%" }}
        >
          {categories.map((category) => (
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              key={category._id}
              sx={{ margin: "auto" }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  padding: "10%",
                  cursor: "pointer",
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <Image
                  src="/thoitrangnam.jpg"
                  alt=""
                  width={40}
                  height={60}
                  className="category-image"
                />
                <span className="category-name-mobile">
                  {category.product_category_name}
                </span>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Slide>
    );
  };

  if (isLoading)
    return (
      <div
        className="header-navigation-container"
        style={{
          transition: `opacity ease-in-out .25s, scale ease-in-out .25s, padding ease-in-out .25s`,
          willChange: "opacity, transform, padding, scale",
          width: "100%",
          marginLeft: "-2rem",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            maxWidth: "100vw",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            height: "70vh",
          }}
          onMouseLeave={handleMouseLeave}
        >
          <CircularProgress color="inherit" className="loading-progress" />
        </Box>
      </div>
    );

  return (
    <div
      className="header-navigation-container"
      style={{
        position: "fixed",
        zIndex: 1,
        left: 0,
        right: 0,
        width: "100vw",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          height: "70vh",
          width: "100%",
          overflowY: "auto",
        }}
        onMouseLeave={handleMouseLeave}
      >
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            {selectedCategory ? (
              <>
                
                <List>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      paddingLeft: "2rem",
                    }}
                  >
                    {parentCategories.length > 0 && (
                      <button onClick={handleBackButtonClick}>
                        {" "}
                        <ArrowBackIcon />{" "}
                      </button>
                    )}
                    <span className="category-name">
                      {selectedCategory.product_category_name}
                    </span>
                  </Stack>
                </List>
                {renderCategoryList(selectedCategory.child_categories || [])}
              </>
            ) : (
              renderCategoryList(data)
            )}
          </>
        )}
      </Box>
    </div>
  );
};
export default HeaderMobileNavigationItem;
