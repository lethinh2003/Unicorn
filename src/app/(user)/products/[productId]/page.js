import { Box } from "@mui/material";
import Description from "./Description";
import InforPage, { getDetailInformationProduct } from "./InforPage";
import ListSuggesting from "./ListSuggesting";
import ListViewed from "./ListViewed";
import ReviewPage from "./ReviewPage";
export default function Home({ params, searchParams }) {
  const { productId } = params;

  return (
    <>
      <InforPage productId={productId} />

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          paddingTop: "4rem",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
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

export async function generateMetadata({ params, searchParams }, parent) {
  const { productId } = params;
  // fetch data
  const dataProduct = await getDetailInformationProduct({ productId });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${dataProduct.product_name}`,
    openGraph: {
      images: [...dataProduct.product_images, ...previousImages],
    },
  };
}
