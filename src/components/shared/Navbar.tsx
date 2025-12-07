
import { getUserInfo } from "@/services/user/getUser";
import { getCookie } from "../auth/handleToken";
import PublicNavbar from "./PublicNavbar";

export default async function Navbar() {
  const accessToken = await getCookie("accessToken");
  const user = await getUserInfo()

  return <PublicNavbar accessToken={accessToken} user={user} />;
}
