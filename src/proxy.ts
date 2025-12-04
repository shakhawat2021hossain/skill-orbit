import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value;
    console.log(accessToken)
    if (accessToken) {
        try {
            const decode = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET!
            ) as JwtPayload;

            console.log(decode)

        } catch (error) {

        }
    }


}