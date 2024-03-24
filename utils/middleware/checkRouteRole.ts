import type { NextRequestWithAuth } from "next-auth/middleware"
import type { role } from "@/types/modelType/role";

interface Params {
    route: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    role: role[]
    req: NextRequestWithAuth;
}

export const setRouteRole = ({route, method, role, req}: Params) => {
    const requestRoute = req.nextUrl.pathname.startsWith(route);
    const requestMethod = req.method === method;
    const hasRole = role.includes(req.nextauth.token?.role);

    // 如果请求路由不是当前规定的路由或方法，直接通过
    if (!requestRoute || !requestMethod) return false;

    // 如果请求路由是当前规定的路由，但是没有权限，返回错误
    return !hasRole;
}