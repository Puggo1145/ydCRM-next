import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { setRouteRole } from './utils/middleware/checkRouteRole';
import { NextResponse } from 'next/server';

export default withAuth(
    // withAuth augments request with the user's token
    function middleware(req: NextRequestWithAuth) {
        if (
            setRouteRole({ route: "/api/data/school", method: 'POST', role: ["super_admin"], req }) || 
            setRouteRole({ route: "/api/data/school", method: 'GET', role: ["super_admin", "admin"], req }) 
        ) {
            return NextResponse.json({message: "权限不足"}, {status: 403});
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },  
    }
)

export const config = {
    matcher: [
        "/",
        "/dashboard",
        "/database",
        "/taskcenter",
        "/api/data/school"
    ]
}