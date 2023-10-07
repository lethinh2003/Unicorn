import ProfileNav from "./nav";
import ProfileHeader from "./profileHeader";
import { Container } from "@mui/material";

export default function LayoutProfile({ children }) {
  return (
    <>
      <Container>
        <ProfileHeader></ProfileHeader>
        <div className="profile-infomation-container">
          <ProfileNav></ProfileNav>
          {children}
        </div>
      </Container>
    </>
  );
}
