"use client"

import { PropsWithChildren } from "react";

import Loader from "@/components/loader";

import Navigation from "./_components/navigation";
import UserInfo from "./_components/user-info";
import { ModeToggle } from "@/components/ui/mode-toggle";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { status } = useSession();

    if (status === "loading") {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader size="default" />
            </div>
        );
    }

    if (status === "unauthenticated") {
        return redirect("/");
    }

    return (
        <div className="h-screen">
            <header className="fixed top-0 flex items-center justify-between w-full h-16 px-4 border-b bg-background dark:bg-blend-darken">
                <Navigation />
                <div className="flex items-center gap-x-2">
                    <ModeToggle />
                    <UserInfo />
                </div>
            </header>
            <main className="h-full pt-16 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;