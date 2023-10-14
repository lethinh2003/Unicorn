"use client";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const GENDER = "men";

const filterPrice = [
  "Nhỏ hơn 100.000đ",
  "100.000đ - 200.000đ",
  "200.000đ - 300.000đ",
  "300.000đ - 400.000đ",
  "400.000đ - 700.000đ",
  "Trên 700.000 đ",
];

const categoriesQuery = async (GENDER) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-categories?gender=${GENDER}`
    );
    const data = response.data.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

const colorsQuery = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-colors`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

const sizesQuery = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-sizes`
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export default function Filter() {
  const {
    data: categories,
    error: categoriesError,
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
  } = useQuery(["category", GENDER], () => categoriesQuery(GENDER));

  const {
    data: sizes,
    error: sizesError,
    isError: isSizesError,
    isLoading: isSizesLoading,
  } = useQuery(["sizes"], sizesQuery);
  const {
    data: colors,
    error: colorsError,
    isError: isColorsError,
    isLoading: isColorsLoading,
  } = useQuery(["colors"], colorsQuery);

  const [open, setOpen] = useState({});

  if (isSizesLoading || isColorsLoading || isCategoriesLoading) return null;

  const handleToggle = (categoryId) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [categoryId]: !prevOpen[categoryId],
    }));
  };

  return (
    <div className="filter-container">
      <List>
        <ListSubheader component="div" id="nested-list-subheader">
          Nam
        </ListSubheader>
        {categories?.map((category) => (
          <div key={category._id}>
            <ListItemButton
              onClick={() => handleToggle(category._id)}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ListItemText primary={category.product_category_name} />
              {open[category._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open[category._id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.child_categories.map((child_category) => (
                  <ListItemButton sx={{ pl: 4 }} key={child_category._id}>
                    <ListItemText
                      primary={child_category.product_category_name}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
        <hr />
        <ListItemButton
          onClick={() => handleToggle("colors")}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ListItemText primary="Màu sắc" />
          {open["colors"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={open["colors"]} timeout="auto" unmountOnExit>
          <div className="colors-filler-container">
            {colors?.map((color) => (
              <Stack direction="row" spacing={1} className="color-selection">
                <div
                  className="color-point"
                  style={{
                    background: color.product_color_code,
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                  }}
                ></div>
                <span>{color.product_color_name}</span>
              </Stack>
            ))}
          </div>
        </Collapse>
        <ListItemButton
          onClick={() => handleToggle("sizes")}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ListItemText primary="Kích thước" />
          {open["sizes"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={open["sizes"]} timeout="auto" unmountOnExit>
          <div className="sizes-filter-container">
            {sizes?.map((size) => (
              <span className="size-item">{size.product_size_name}</span>
            ))}
          </div>
        </Collapse>
        <ListItemButton
          onClick={() => handleToggle("price")}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ListItemText primary="Giá" />
          {open["price"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={open["price"]} timeout="auto" unmountOnExit>
          <FormGroup sx={{ paddingLeft: 1 }}>
            {filterPrice.map((price, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={price}
              />
            ))}
          </FormGroup>
        </Collapse>
      </List>
    </div>
  );
}
