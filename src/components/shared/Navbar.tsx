
import { getUserInfo } from "@/services/user/getUser";
import PublicNavbar from "./PublicNavbar";
import { getCookie } from "@/lib/handleToken";

export default async function Navbar() {
  const accessToken = await getCookie("accessToken");
  const user = await getUserInfo()

  return <PublicNavbar accessToken={accessToken} user={user} />;
}
