"use client"

import { ModeToggle } from "@/components/ui/mode-toggle";
import { UsersRound } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="h-16 p-4 flex items-center justify-between border">
            <section className="flex items-center gap-x-2">
                <UsersRound />
                <h1 className="text-md md:text-lg font-bold">樾达教育信息管理系统</h1>
            </section>
            <ModeToggle />
        </header>
    );
};

export default Header;