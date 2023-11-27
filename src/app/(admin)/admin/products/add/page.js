"use client";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Checkbox, Stack, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

const getColors = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-colors`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

const getSizes = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-sizes`
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export default function AddProduct() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedGender, setSelectedGender] = useState("men");
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery(["categories", selectedGender], () =>
    getCategories(selectedGender)
  );
  const {
    data: sizes,
    isLoading: isSizesLoading,
    isError: isSizesError,
  } = useQuery(["sizes"], getSizes);

  const {
    data: colors,
    isLoading: isColorsLoading,
    isError: isColorsError,
  } = useQuery(["colors"], getColors);

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length) {
      const newImages = Array.from(files);
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <>
      <div className="add-product-container">
        <Stack direction="row">
          <div className="add-product-image">
            <Stack
              className="add-product-pt"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>Tải lên ảnh sản phẩm</span>
              <Button
                className="button-upload-image"
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "1rem",
                  padding: "1rem",
                }}
                component="label"
                startIcon={<AddAPhotoIcon sx={{ fontSize: 40 }} />}
              >
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </Button>
            </Stack>
            <div className="selected-images">
              <ImageList sx={{ width: 180, maxHeight: 450 }} cols={1}>
                {selectedImages?.map((image, index) => (
                  <ImageListItem
                    key={index}
                    sx={{
                      alignItems: "center",
                      padding: "1rem",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        border: "1px solid #ccc",
                        borderRadius: "1rem",
                        padding: "1rem 2rem 1rem 1rem",
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: "1px",
                          right: "1px",
                        }}
                        onClick={() => handleImageRemove(index)}
                      >
                        <ClearIcon fontSize="inherit" color="#000" />
                      </IconButton>
                      <Image
                        className="product-selected-image"
                        src={URL.createObjectURL(image)}
                        alt=""
                        width={100}
                        height={150}
                      />
                    </div>
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
          <hr />
          <div className="add-product-infomation">
            <form>
              <Stack className="add-product-pt">
                <span>ID sản phẩm cha</span>
                <TextField></TextField>
              </Stack>
              <Stack className="add-product-pt">
                <span>Tên sản phẩm</span>
                <TextField></TextField>
              </Stack>
              <Stack className="add-product-pt">
                <span>Link ảnh sản phẩm</span>
                <TextField></TextField>
              </Stack>
              <Stack direction="row" spacing={2} className="add-product-pt">
                <Stack>
                  <span>Tình trạng</span>
                  <TextField></TextField>
                </Stack>
                <Stack sx={{ width: "27rem" }}>
                  <span>Giới tính</span>
                  <FormControl>
                    <Select
                      value={selectedGender}
                      onChange={handleGenderChange}
                    >
                      <MenuItem value={"men"}>Nam</MenuItem>
                      <MenuItem value={"women"}>Nữ</MenuItem>
                      <MenuItem value={"unisex"}>Khác</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
              <Stack className="add-product-pt">
                <span>Danh mục sản phẩm</span>
                <FormControl>
                  <Select native>
                    <option aria-label="None" value="">
                      Chưa phân loại
                    </option>
                    {categories?.map((category) => (
                      <optgroup
                        key={category._id}
                        label={category.product_category_name}
                      >
                        {category.child_categories?.map((child_category, i) => (
                          <option key={i}>
                            {child_category.product_category_name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stack className="add-product-pt">
                <Stack direction="row" spacing={6}>
                  <span>Kích cỡ</span>
                  <span>Số lượng</span>
                </Stack>
                {sizes?.map((size) => (
                  <Stack
                    key={size._id}
                    className="add-product-pt"
                    direction="row"
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "10rem" }}>
                      <Checkbox /> {size.product_size_name}
                    </Box>
                    <TextField
                      type="number"
                      sx={{ width: "39.7rem" }}
                    ></TextField>
                  </Stack>
                ))}
              </Stack>
              <Stack className="add-product-pt">
                <span>Màu sắc</span>
                <Select>
                  {colors?.map((color) => (
                    <MenuItem key={color._id} value={color.product_color_code}>
                      {color.product_color_name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              <Stack className="add-product-pt">
                <span>Mô tả</span>
                <TextField></TextField>
              </Stack>
              <Stack direction="row" spacing={1} className="add-product-pt">
                <Stack>
                  <span>Giá</span>
                  <TextField
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">vnđ</InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Stack>
                <Stack>
                  <span>Giá khi giảm (nếu có)</span>
                  <TextField
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">vnđ</InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  padding: "2rem 0",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <Button className="cancle-add-product">Hủy</Button>
                <Button className="confirm-add-product">Xác Nhận</Button>
              </Stack>
            </form>
          </div>
        </Stack>
      </div>
    </>
  );
}
