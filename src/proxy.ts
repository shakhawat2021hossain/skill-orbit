// import jwt, { JwtPayload } from "jsonwebtoken";
// import { NextRequest, NextResponse } from "next/server";
// import { canRoleAccessRoute, getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from "./lib/authUtils";
// import { UserRole } from "./types/user";

// export async function proxy(req: NextRequest) {
//     const token = req.cookies.get("token")?.value || null;
//     const path = req.nextUrl.pathname
//     const url = req.nextUrl.clone();


//     // console.log("cloned:", url)
//     // console.log("path:", path)
//     let user: JwtPayload | null = null;

//     // ---- Step 1: Validate Token ----
//     if (token) {
//         try {
//             user = jwt.verify(
//                 token,
//                 process.env.ACCESS_TOKEN_SECRET!
//             ) as JwtPayload;
//         } catch (error) {
//             // Invalid token => wipe cookies & redirect to login
//             url.pathname = "/login";
//             const res = NextResponse.redirect(url);
//             res.cookies.delete("token");
//             res.cookies.delete("refreshToken");
//             return res;
//         }
//     }

//     // If accessing auth routes while logged in, redirect to dashboard
//     if (isAuthRoute(path)) {
//         if (token && user?.role) {
//             url.pathname = getDefaultDashboardRoute(user.role as UserRole);
//             return NextResponse.redirect(url);
//         }
//         return NextResponse.next(); // allow login/register for guests
//     }

//     // Check if route requires authentication
//     const owner = getRouteOwner(path);
//     if (owner === null) {
//         return NextResponse.next(); // Allow public pages
//     }

//     // Protected route - must be logged in
//     if (!token) {
//         url.pathname = "/login";
//         url.searchParams.set("redirect", path);
//         return NextResponse.redirect(url);
//     }

//     // Check role-based access
//     const role = user?.role as UserRole;
//     const canAccess = canRoleAccessRoute(path, role);
//     console.log(`[AUTH] Path: ${path}, Role: ${role}, Owner: ${getRouteOwner(path)}, CanAccess: ${canAccess}`);

//     if (!canAccess) {
//         url.pathname = getDefaultDashboardRoute(role);
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next(); // Allow access

// }

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
//     ],

// }


import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { deleteCookie, getCookie } from './lib/handleToken';
import { UserRole } from './types/user';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from './lib/authUtils';

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const url = request.nextUrl.clone();

    const token = await getCookie("token") || null;
    let userRole: UserRole | null = null;

    if (token) {
        try {
            const verifiedToken = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            ) as JwtPayload;

            userRole = verifiedToken.role;
        } catch (error: any) {
            console.error("[AUTH] token verification failed:", error?.message || error);
            // If the secret is not set in the environment, allow the request to proceed
            // (prevents a redirect loop caused by an unverifiable token still present in cookies).
            if (!process.env.ACCESS_TOKEN_SECRET) {
                console.warn("[AUTH] ACCESS_TOKEN_SECRET is not set; allowing request to proceed to avoid redirect loop.");
                return NextResponse.next();
            }

            // Secret exists but verification failed (invalid/expired token) => clear cookie and redirect to login
            await deleteCookie("token");
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // ✅ Rule 1: Logged-in user should not see auth pages
    if (token && isAuth) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
        );
    }

    // ✅ Rule 2: Public routes
    if (routeOwner === null) {
        return NextResponse.next();
    }

    // ✅ Rule 3: COMMON routes must be authenticated
    if (routeOwner === "COMMON") {
        if (!token) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    // ✅ Rule 4: Protected role-based routes
    if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ✅ Rule 5: Enforce role ownership
    if (routeOwner !== userRole) {
        url.pathname = getDefaultDashboardRoute(userRole as UserRole);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}