// Navbar.tsx (SERVER)
import { getUserInfo } from "@/services/user/getUser";
import { getCookie } from "@/lib/handleToken";
import NavbarClient from "./NavbarClient";
import { IUser } from "@/types/user";

export default async function Navbar() {
  const accessToken = await getCookie("accessToken") as string;
  const user = await getUserInfo();
  const savedCount = (user?.wishlist?.length as number) || 0;

  return (
    <NavbarClient
      accessToken={accessToken}
      user={user as IUser}
      savedCount={savedCount}
    />
  );
}
