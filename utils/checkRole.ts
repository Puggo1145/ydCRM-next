import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// types
import type { Session } from "next-auth";
import type { role } from "@/types/modelType/role";

async function checkRoles(allowedRole: role[]) {
    const session: Session | null = await getServerSession({ ...authOptions }) as Session;
    const role = session?.user?.role as role;

    console.log(role);

    return allowedRole.includes(role);
}

export default checkRoles;