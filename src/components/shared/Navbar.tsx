
import { getCookie } from "@/services/user/getUser";
import PublicNavbar from "./PublicNavbar";

export default async function Navbar() {
  const accessToken = await getCookie("accessToken");

  return <PublicNavbar accessToken={accessToken} />;
}
