import ProfileNav from "./nav";
import { Container } from "@mui/material";

export default function LayoutProfile({ children }) {
  return (
    <>
      <Container>
        <div className="profile-infomation-container">
          <ProfileNav></ProfileNav>
          {children}
        </div>
      </Container>
    </>
  );
}
