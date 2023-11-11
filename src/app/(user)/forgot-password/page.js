import ForgotPassword from "@/components/auth/forgot-password/ForgotPassword";
import ROUTERS_PATH from "@/configs/config.routers.path";
import isAuthenticated from "@/utils/checkAuthenticated";
import { Container } from "@mui/material/";
import { redirect } from "next/navigation";

async function Home() {
  // Check is user was already login -> redirect to home
  const isLogged = await isAuthenticated();
  if (isLogged) {
    redirect(ROUTERS_PATH.HOME_PAGE, "replace");
  }

  return (
    <Container>
      <ForgotPassword />
    </Container>
  );
}
export default Home;
