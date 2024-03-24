"use client"

import { PropsWithChildren } from "react";

import Loader from "@/components/loader";

import Navigation from "./_components/navigation";
import UserInfo from "./_components/user-info";
import { ModeToggle } from "@/components/ui/mode-toggle";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { status } = useSession();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (status === "loading" || !isMounted) {
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <div className="h-screen">
            <header className="fixed top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b bg-background dark:bg-blend-darken">
                <Navigation />
                <div className="flex items-center gap-x-2">
                    <ModeToggle />
                    <UserInfo />
                </div>
            </header>
            <main className="h-full pt-16 overflow-y-auto  max-w-[1920px] m-auto">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;