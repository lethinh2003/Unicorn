'use client'
import { Stack, Button, Radio, Breadcrumbs,Typography,Link } from "@mui/material";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';


  const USER_REVIEWS = [
    {
        avatar:"public\logo.png",
        name:"TeaMee",
        star:5,
        color: "Đen",
        size:"L",
        comment: "Sản phẩm tuỵt zời khách hàng rất iu ",
        picture:"public/review.png",
      
    },
    {
        name:"Tum",
        star:5,
        color: "Đen",
        size:"L",
        comment: "Sản phẩm tuỵt zời khách hàng rất iu ",
        image:"public/review.png",
        image:"public/review.png"
      },
    
  ];

  const RATING = [
    {
        star:"5",
        numberofstar:5,
        number:"2",
    },
    {
      star:"4",
      numberofstar:4,
      number:"0"
    },
    {
      star:"3",
      numberofstar:3,
      number:"0"
    },
    {
      star:"2",
      numberofstar:2,
      number:"0"
    },
    {
    star:"1",
    numberofstar:1,
    number:"0"
    }
  ];

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
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

  export default function Reviews() {
    const [review, setReviews] = useState(USER_REVIEWS);
    const [value, setValue] = React.useState();
    const [star, setStar] = useState(RATING)
    const handleSetDefault = (index) => {
      const updatedReviews = review.map((review, i) => {
        return {
          ...review,
          isDefault: i === index,
        };
      });
      setReviews(updatedReviews);

      const updatedStar = star.map((star, i) => {
        return {
          ...star,
          isDefault: i === index,
        };
      });
      setStar(updatedStar);

      
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    return (
    <>
      <div className="review-containner">
          <div className="review-title">Đánh giá</div>
          <div className="overall-review">
            <div className="overall-rating">
              <div className="point">5/5</div>
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                }}
              >
                <Rating name="read-only" value={5} readOnly size="large"/>          
              </Box>
              <button className="write-review">Viết đánh giá</button>
            </div>
            
            <div className="rating-area">
            <Stack>
              {star.map((star, index) => (
                <div key={index} className="review-star">
                  <div className="name-star"> {star.star} sao</div>
                  <Rating name="read-only" value={star.numberofstar} readOnly size="small" className="img-star"/>          
                  <div className="number-of-review">({star.number})</div>
                </div>
              ))}
            </Stack>
            </div>
          </div>
          
          <div className="product-rating-list">
              <Box sx={{ width: '100%'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="rate-heading">
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tất cả đánh giá(2)" {...a11yProps(0)} />
                    <Tab label="Hình ảnh" {...a11yProps(1)} />
                  </Tabs>
                  <div className="rating">
                    Xếp hạng
                    <select name="Tất cả" id="rate" className="rate">
                      <option value="">Tất cả</option>
                      <option value="1">1 sao</option>
                      <option value="2">2 sao</option>
                      <option value="3">3 sao</option>
                      <option value="4">4 sao</option>
                      <option value="5">5 sao</option>
                    </select>  
                  </div>
                </Box>
                <CustomTabPanel value={value} index={0} className="rating-body">
                  <Stack>
                    {review.map((review, index) => (
                        <div key={index} className="review-item">
                          <div className="info-reviewer">
                            <Avatar alt="TeaMee" src={review.avatar} />
                            <div className="name-rate">
                              <div className="name">{review.name}</div>
                              <Rating name="read-only" value={review.star} readOnly size="large" className="img-star"/>          
                            </div>
                          </div> 
                          <div classname="detail">
                            <div className="col">
                              <div className="element">Màu sắc: </div>
                              <div className="detail">{review.color}</div>
                                
                            </div>
                            
                            <div className="col">
                              <div className="element">Kích cỡ: </div>
                              <div className="detail">{review.size}</div>
                            </div>
                            <div className="comment">{review.comment}</div>
                            
                            <div className="respone-image">
                              <img src={review.picture} alt="pc1" />
                            </div>

                          </div>

                          
                        </div>
                      ))}
                  </Stack>
                  <Link><span className="More">Xem thêm</span></Link>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  Item Two
                </CustomTabPanel>
              </Box>
              
              
            </div>


            
          
      </div>
    </>
  );
}
