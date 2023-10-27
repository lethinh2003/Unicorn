"use client";
import AllImageReviewsProducts from "@/components/product/AllImageReviewsProduct";
import AllReviewsProducts from "@/components/product/AllReviewsProduct";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import { useState } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "2rem 0" }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Review({ productId, countReviews }) {
  const [value, setValue] = useState(0);

  const [filter, setFilter] = useState({
    sort: "desc",
    rating: "all",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div
        className="product-rating-list"
        style={{
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="rate-heading"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={`Tất cả đánh giá (${countReviews})`}
                {...a11yProps(0)}
              />
              <Tab label="Hình ảnh" {...a11yProps(1)} />
            </Tabs>
            <div className="rating">
              Xếp hạng
              <select
                name="Tất cả"
                value={filter.rating}
                className="rate"
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    rating: e.target.value,
                  }))
                }
              >
                <option value="all">Tất cả</option>
                <option value="1">1 sao</option>
                <option value="2">2 sao</option>
                <option value="3">3 sao</option>
                <option value="4">4 sao</option>
                <option value="5">5 sao</option>
              </select>
            </div>
          </Box>
          <CustomTabPanel value={value} index={0} className="rating-body">
            <AllReviewsProducts productId={productId} filter={filter} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AllImageReviewsProducts productId={productId} filter={filter} />
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}
