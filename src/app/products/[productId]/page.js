"use client";
import { Box, Container } from "@mui/material";
import Description from "./Description";
import Infor from "./Infor";
import ListSuggesting from "./ListSuggesting";
import ListViewed from "./ListViewed";
import Review from "./Review";

export default function Home({ params }) {
  const { productId } = params;

  return (
    <>
      <Container>
        <Infor productId={productId} />
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              width: "55%",
            }}
          >
            <ListSuggesting />
          </Box>
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Description productId={productId} />
          </Box>
        </Box>

        <Review />

        <ListViewed />
      </Container>
    </>
  );
}
