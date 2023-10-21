"use client";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { BsCheckSquare } from "react-icons/bs";
import { ThreeDots } from "react-loading-icons";
const LoadingBox = ({ isSuccess, isLoading }) => {
  const theme = useTheme();
  const BoxLoading = styled(Box)({
    borderRadius: "2rem",
    backgroundColor: "#fff",
    color: "black",
    width: "20rem",
    height: "20rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  });
  const LoadingContent = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });
  const LoadingIconSuccess = styled(BsCheckSquare)({
    fontSize: "5rem",
    color: "#41bf90",
  });
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 2,
          width: "100%",

          left: "50%",
          transform: "translateX(-50%)",
        }}
        open={isLoading}
      >
        <BoxLoading>
          {!isSuccess && (
            <>
              <ThreeDots
                fill={theme.palette.primary.main}
                width={50}
                height={50}
                speed={0.75}
              />
              <LoadingContent>Đang tải...</LoadingContent>
            </>
          )}
          {isSuccess && (
            <>
              <LoadingIconSuccess />
              <LoadingContent>Success</LoadingContent>
            </>
          )}
        </BoxLoading>
      </Backdrop>
    </>
  );
};
export default LoadingBox;

export const LoadingContent = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};
