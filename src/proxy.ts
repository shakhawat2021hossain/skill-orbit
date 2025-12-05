import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { canRoleAccessRoute, getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from "./lib/authUtils";
import { UserRole } from "./types/user";

export async function proxy(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value || null;
    const path = req.nextUrl.pathname
    const url = req.nextUrl.clone();


    console.log("cloned:", url)
    console.log("path:", path)
    let user: JwtPayload | null = null;

    // ---- Step 1: Validate Token ----
    if (accessToken) {
        try {
            user = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET!
            ) as JwtPayload;
        } catch (error) {
            // Invalid token => wipe cookies & redirect to login
            url.pathname = "/login";
            const res = NextResponse.redirect(url);
            res.cookies.delete("accessToken");
            res.cookies.delete("refreshToken");
            return res;
        }
    }

    if (isAuthRoute(path)) {
        if (accessToken && user?.role) {
            url.pathname = getDefaultDashboardRoute(user.role as UserRole);
            return NextResponse.redirect(url);
        }
        return NextResponse.next(); // allow login/register for guests

    }

    const owner = getRouteOwner(path);
    if (owner === null) {
        return NextResponse.next(); // Allow public pages
    }


    if (!accessToken) {
        url.pathname = "/login";
        url.searchParams.set("redirect", path);
        return NextResponse.redirect(url);
    }




    const role = user?.role as UserRole;

    if (!canRoleAccessRoute(path, role)) {
        url.pathname = getDefaultDashboardRoute(role);
        return NextResponse.redirect(url);
    }

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],

}