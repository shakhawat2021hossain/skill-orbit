export enum UserRole {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
}

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


// route groups 
export const routeGroups = {
    COMMON: {
        exact: ["/my-profile", "/settings", "/change-password"],
        patterns: [],
    },
    ADMIN: {
        exact: [],
        patterns: [/^\/admin/],
    },
    STUDENT: {
        exact: [],
        patterns: [/^\/dashboard/, /^\/courses/],
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
    return role === UserRole.ADMIN ? "/admin/dashboard" : "/dashboard";
}

// the ultimate func for deciding
export function canRoleAccessRoute(path: string, role: UserRole): boolean {
    const owner = getRouteOwner(path);

    if (owner === null) return true;        // public routes always allowed
    if (owner === "COMMON") return true;    // shared protected routes
    return owner === role;                  // strict role match
}
