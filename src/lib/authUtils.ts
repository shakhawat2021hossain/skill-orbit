// import { UserRole } from "@/types/user";

// export type RouteConfig = {
//     exact: string[],
//     patterns: RegExp[],
// }

// // public auth routes
// export const authRoutes = [
//     "/login",
//     "/register",
//     "/forgot-password",
//     "/reset-password",
// ];


// // route groups 
// export const routeGroups = {
//     COMMON: {
//         exact: ["/my-profile", "/settings", "/change-password"],
//         patterns: [],
//     },
//     ADMIN: {
//         exact: [],
//         patterns: [/^\/admin/],
//     },
//     STUDENT: {
//         exact: [],
//         patterns: [/^\/dashboard/, /^\/courses/],
//     },
// };

// // match route
// export function matchRoute(pathname: string, config: RouteConfig) {
//     if (config.exact.includes(pathname)) return true;
//     return config.patterns.some((pattern) => pattern.test(pathname));
// }


// // get route owner
// export function getRouteOwner(pathname: string): "ADMIN" | "STUDENT" | "COMMON" | null {
//     if (matchRoute(pathname, routeGroups.ADMIN)) return "ADMIN";
//     if (matchRoute(pathname, routeGroups.STUDENT)) return "STUDENT";
//     if (matchRoute(pathname, routeGroups.COMMON)) return "COMMON";
//     return null; // public
// }

// // check auth route or not
// export function isAuthRoute(pathname: string) {
//     return authRoutes.includes(pathname);
// }

// // 
// export function getDefaultDashboardRoute(role: UserRole) {
//     return role === UserRole.ADMIN ? "/admin/dashboard" : "/dashboard";
// }

// // the ultimate func for deciding
// export function canRoleAccessRoute(path: string, role: UserRole): boolean {
//     const owner = getRouteOwner(path);

//     if (owner === null) return true;        // public routes always allowed
//     if (owner === "COMMON") return true;    // shared protected routes
//     return owner === role;                  // strict role match
// }


// import { UserRole } from "@/types/user";

// export type RouteConfig = {
//     exact: string[],
//     patterns: RegExp[],
// }

// // public auth routes
// export const authRoutes = [
//     "/login",
//     "/register",
//     "/forgot-password",
//     "/reset-password",
// ];

// // route groups - role-based access control
// export const routeGroups = {
//     COMMON: {
//         exact: ["/profile", "/settings", "/change-password"],
//         patterns: [],
//     },
//     ADMIN: {
//         exact: [],
//         patterns: [/^\/dashboard\/admin/],
//     },
//     STUDENT: {
//         exact: [],
//         patterns: [/^\/dashboard\/student/, /^\/dashboard\/dashboard/, /^\/courses/],
//     },
//     INSTRUCTOR: {
//         exact: [],
//         patterns: [/^\/dashboard\/instructor/, /^\/dashboard\/dashboard/, /^\/courses/],
//     },
// };

// // match route
// export function matchRoute(pathname: string, config: RouteConfig) {
//     if (config.exact.includes(pathname)) return true;
//     const matched = config.patterns.some((pattern) => pattern.test(pathname));
//     return matched;
// }

// // get route owner
// export function getRouteOwner(pathname: string): "ADMIN" | "STUDENT" | "INSTRUCTOR" | "COMMON" | null {
//     if (matchRoute(pathname, routeGroups.ADMIN)) return "ADMIN";
//     if (matchRoute(pathname, routeGroups.INSTRUCTOR)) return "INSTRUCTOR";
//     if (matchRoute(pathname, routeGroups.STUDENT)) return "STUDENT";
//     if (matchRoute(pathname, routeGroups.COMMON)) return "COMMON";
//     return null; // public
// }

// // check auth route or not
// export function isAuthRoute(pathname: string) {
//     return authRoutes.includes(pathname);
// }

// // get default dashboard route based on user role
// export function getDefaultDashboardRoute(role: UserRole) {
//     switch (role) {
//         case UserRole.ADMIN:
//             return "/dashboard/dashboard";
//         case UserRole.INSTRUCTOR:
//             return "/dashboard/dashboard";
//         case UserRole.STUDENT:
//         default:
//             return "/dashboard/dashboard";
//     }
// }

// // the ultimate func for deciding access
// export function canRoleAccessRoute(path: string, role: UserRole): boolean {
//     const owner = getRouteOwner(path);

//     if (owner === null) return true;        // public routes
//     if (owner === "COMMON") return true;    // shared protected routes

//     // Role-specific checks
//     if (owner === "ADMIN" && role === UserRole.ADMIN) return true;
//     if (owner === "INSTRUCTOR" && role === UserRole.INSTRUCTOR) return true;
//     if (owner === "STUDENT" && role === UserRole.STUDENT) return true;

//     return false; // deny by default
// }


import { UserRole } from "@/types/user";

export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

// public auth routes
export const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
];


// // route groups - role-based access control
export const routeGroups = {
    COMMON: {
        exact: ["/profile", "/settings", "/change-password"],
        patterns: [],
    },
    ADMIN: {
        exact: [],
        patterns: [/^\/admin\/dashboard/],
    },
    STUDENT: {
        exact: [],
        patterns: [/^\/dashboard/],
    },
    INSTRUCTOR: {
        exact: [],
        patterns: [/^\/instructor\/dashboard/],
    },
};

// match route
export function matchRoute(pathname: string, config: RouteConfig) {
    if (config.exact.includes(pathname)) return true;
    return config.patterns.some((pattern) => pattern.test(pathname));
}


// get route owner
export function getRouteOwner(pathname: string): "ADMIN" | "STUDENT" | "COMMON" | null {
    if (matchRoute(pathname, routeGroups.ADMIN)) return "ADMIN";
    if (matchRoute(pathname, routeGroups.STUDENT)) return "STUDENT";
    if (matchRoute(pathname, routeGroups.COMMON)) return "COMMON";
    return null; // public
}

// check auth route or not
export function isAuthRoute(pathname: string) {
    return authRoutes.includes(pathname);
}

// 
export function getDefaultDashboardRoute(role: UserRole) {
    if(role === UserRole.INSTRUCTOR) return "/instructor/dashboard"
    return role === UserRole.ADMIN ? "/admin/dashboard" : "/dashboard/student";
}

// the ultimate func for deciding
export function canRoleAccessRoute(path: string, role: UserRole): boolean {
    const owner = getRouteOwner(path);
    console.log("owner", owner)

    if (owner === null) return true;        // public routes always allowed
    if (owner === "COMMON") return true;    // shared protected routes
    return owner === role;                  // strict role match
}