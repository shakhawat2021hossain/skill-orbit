import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value;
    const path = req.nextUrl.pathname

    // console.log(accessToken)
    console.log("path:", path)
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

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],

}