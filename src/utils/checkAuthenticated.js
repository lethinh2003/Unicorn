import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

const isAuthenticated = async () => {
  try {
    const session = await getServerSession(authOptions);
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(!!session);
      }, 0)
    );
  } catch (err) {
    console.log(err);
  }
  return false;
};

export default isAuthenticated;
