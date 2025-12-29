import { getUserInfo } from "@/services/user/getUser";
import { getCookie } from "@/lib/handleToken";
import NavbarClient from "./NavbarClient";
import { IUser } from "@/types/user";

export default async function Navbar() {
  const token = await getCookie("token") as string;
  const user = await getUserInfo();
  const savedCount = (user?.wishlist?.length as number) || 0;

  return (
    <NavbarClient
      token={token}
      user={user as IUser}
      savedCount={savedCount}
    />
  );
}
