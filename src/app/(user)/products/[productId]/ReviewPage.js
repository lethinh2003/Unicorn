import { Box, Button, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Review from "./Review";

export const getOverviewRatingProduct = async ({ productId }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/products/reviews/rating-overview?productId=${productId}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    return data.data;
  } catch (err) {
    throw err;
  }
};

export default async function ReviewPage({ productId }) {
  const dataRatingOverview = await getOverviewRatingProduct({ productId });
  const {
    average,
    count_1,
    count_2,
    count_3,
    count_4,
    count_5,
    count_reviews,
  } = dataRatingOverview;
  const DATA_RATING = [
    {
      star: "5",
      numberofstar: 5,
      number: count_5,
    },
    {
      star: "4",
      numberofstar: 4,
      number: count_4,
    },
    {
      star: "3",
      numberofstar: 3,
      number: count_3,
    },
    {
      star: "2",
      numberofstar: 2,
      number: count_2,
    },
    {
      star: "1",
      numberofstar: 1,
      number: count_1,
    },
  ];
  return (
    <>
      <Box
        sx={{
          paddingTop: "4rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          Đánh giá
        </Typography>
        <div
          className="review-containner"
          style={{
            width: "100%",
          }}
        >
          <div
            className="overall-review"
            style={{
              width: "100%",
              gap: "2rem",
            }}
          >
            <div
              className="overall-rating"
              style={{
                width: "55%",
                marginLeft: "unset",
              }}
            >
              <div className="point">{average}/5</div>
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Rating
                  name="read-only"
                  value={average}
                  readOnly
                  precision={0.1}
                  size="large"
                />
              </Box>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                Viết đánh giá
              </Button>
            </div>

            <div
              className="rating-area"
              style={{
                flex: 1,
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                }}
              >
                {DATA_RATING.map((star, index) => (
                  <div
                    key={index}
                    className="review-star"
                    style={{
                      marginRight: "unset",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div className="name-star"> {star.star} sao</div>
                    <Rating
                      name="read-only"
                      value={star.numberofstar}
                      readOnly
                      size="small"
                      className="img-star"
                    />
                    <div className="number-of-review">({star.number})</div>
                  </div>
                ))}
              </Stack>
            </div>
          </div>
          <Review productId={productId} countReviews={count_reviews} />
        </div>
      </Box>
    </>
  );
}
