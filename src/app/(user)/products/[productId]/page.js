import { Box } from "@mui/material";
import Description from "./Description";
import InforPage from "./InforPage";
import ListSuggesting from "./ListSuggesting";
import ListViewed from "./ListViewed";
import ReviewPage from "./ReviewPage";
export default function Home({ params }) {
  const { productId } = params;

  return (
    <>
      <InforPage productId={productId} />

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          paddingTop: "4rem",
        }}
      >
        <Box
          sx={{
            width: "55%",
          }}
        >
          <ListSuggesting productId={productId} />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Description productId={productId} />
        </Box>
      </Box>

      <ReviewPage productId={productId} />

      <ListViewed />
    </>
  );
}
