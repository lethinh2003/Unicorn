'use client'
import { Stack, Button, Radio, Breadcrumbs,Typography,Link } from "@mui/material";
import { useState } from "react";
import { Image } from 'next/image';

  const USER_REVIEWS = [
    {

        name:"TeaMee",
        color: "Đen",
        size:"L",
        comment: "Sản phẩm tuỵt zời khách hàng rất iu ",
        image:"image.png",
      
    },
    {
        name:"Tum",
        color: "Đen",
        size:"L",
        comment: "Sản phẩm tuỵt zời khách hàng rất iu ",
        image:"image.png",
      },
    
  ];

export default function Reviews() {
    const [review, setReviews] = useState(USER_REVIEWS);
    const handleSetDefault = (index) => {
      const updatedReviews = review.map((review, i) => {
        return {
          ...review,
          isDefault: i === index,
        };
      });
      setReviews(updatedReviews);
    };
  return (
    <>
    <div className="review-containner">
        <div className="review-title">Đánh giá</div>
        <div className="overall-review">
          <div className="overall-rating">
            <div className="point">5/5</div>
            <img src="star.png" alt="star" className="star-big"/>
            <button className="write-review">Viết đánh giá</button>
          </div>
          
          <div className="rating-area">
            <div className="review-star">
              <div className="name-star"> 5 sao</div>
              <img src="star.png" alt="star"  className="img-star" />
              <div className="number-of-review">(2)</div>
            </div>
            <div className="review-star">
              <div className="name-star"> 4 sao</div>
              <img src="star.png" alt="star"  className="img-star" />
              <div className="number-of-review">(0)</div>
            </div>
            <div className="review-star">
              <div className="name-star"> 3 sao</div>
              <img src="star.png" alt="star"  className="img-star" />
              <div className="number-of-review">(0)</div>
            </div>
            <div className="review-star">
              <div className="name-star"> 2 sao</div>
              <img src="star.png" alt="star"  className="img-star" />
              <div className="number-of-review">(0)</div>
            </div>
            <div className="review-star">
              <div className="name-star"> 1 sao</div>
              <img src="star.png" alt="star"  className="img-star" />
              <div className="number-of-review">(0)</div>
            </div>
          </div>
        </div>
        
        <div className="product-rating-list">
          <div className="rate-heading">
            <div className="link-rating">
              <div className="all-rating">Tất cả đánh giá(2)</div>
              <div className="picture">Hình ảnh(1)</div>
            </div>
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
          </div>

          <div className="rating-body">
            <Stack>
            {review.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="info-reviewer">
                    <img src="avt.png" alt="avatar" />
                    <div className="name-rate">
                      <div className="name">{review.name}</div>
                      <img src="star.png" alt="star"  className="img-star" />
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
                      <img src="picture1.png" alt="pc1" />
                    </div>

                  </div>

                  
                </div>
              ))}
            </Stack>
            <Link><span className="More">Xem thêm</span></Link>
          </div>

          
        </div>
    </div>
    </>
  );
}
