"use client"

import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignJustify, X } from 'lucide-react';

import { navigationLinks } from "@/constants/navigation.contants";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

const Navigation: React.FC = () => {

    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        setIsNavCollapsed(false);
    }, [pathname]);

    return (
        <>
            <div className="md:hidden">
                <Button asChild variant="ghost" className="p-0 hover:bg-transparent" onClick={() => setIsNavCollapsed(!isNavCollapsed)}>
                    {isNavCollapsed ? <X /> : <AlignJustify />}
                </Button>
            </div>
            <NavigationMenu
                className="fixed top-16 left-0 bg-background md:static"
            >
                <NavigationMenuList
                    className="
                        flex flex-col items-start 
                        overflow-hidden w-screen space-x-0 
                        border-b bg-gray-50 dark:bg-gray-900 transition-all duration-500 
                        md:flex-row md:w-auto md:bg-background md:border-none
                        md:overflow-auto"
                    style={(hasMounted && isMobile) ? { height: isNavCollapsed ? `140px` : `0px` } : undefined}
                >
                    {navigationLinks.map((link) => (
                        <NavigationMenuItem key={link.path}>
                            <Link href={link.path} legacyBehavior passHref className="w-full">
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-transparent text-md md:text-sm",
                                        pathname === link.path && "font-bold text-primary"
                                    )}
                                >
                                    {link.name}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
};

export default Navigation;