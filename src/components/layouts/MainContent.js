import { Box } from "@mui/material";
const MainContent = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          padding: "0 1rem",
          paddingTop: "10rem",
        }}
      >
        {children}
      </Box>
    </>
  );
};
export default MainContent;
