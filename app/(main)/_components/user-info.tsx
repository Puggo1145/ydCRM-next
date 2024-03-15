import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useSession, signOut } from "next-auth/react";

const UserInfo: React.FC = () => {
    const { data } = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center h-full gap-x-3 text-sm border p-[3px] rounded-md hover:bg-gray-50">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={data?.user?.image || "/avatars/01.png"}></AvatarImage>
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            {data?.user?.name}
                        </span>
                    </div>
                    <ChevronsLeftRight className="rotate-90 text-muted-foreground h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="end"
            >
                <DropdownMenuLabel>
                    <p className="text-sm line-clamp-1">
                        {data?.user?.name} 的账号
                    </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full cursor-pointer text-red-500">
                    <Button variant="ghost" onClick={() => signOut()}>退出登录</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserInfo;