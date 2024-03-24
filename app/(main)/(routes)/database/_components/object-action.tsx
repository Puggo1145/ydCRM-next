"use client"

// shadcn component
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// icons
import { EllipsisVertical } from 'lucide-react';
// components
import Link from "next/link";

interface Props {
    id: string;
    href: `/${string}/`;
    className?: string;
}

const ObjectAction: React.FC<Props> = ({ href, id, className }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={className}>
                <EllipsisVertical size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>数据操作</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={href+id} className="w-full">
                        查看
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
};

export default ObjectAction;