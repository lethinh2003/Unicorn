import { Box, Container } from "@mui/material";
import ProfileNav from "./nav";

export default function LayoutProfile({ children }) {
  return (
    <>
      <Container>
        <Box
          className="profile-infomation-container"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: "1rem",
          }}
        >
          <ProfileNav></ProfileNav>
          {children}
        </Box>
      </Container>
    </>
  );
}
