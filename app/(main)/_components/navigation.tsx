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
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const Navigation: React.FC = () => {

    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);

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
                        border-b bg-primary/5 transition-all duration-500 
                        md:flex-row md:w-auto md:bg-background md:border-none
                        md:overflow-auto"
                    style={isMobile ? { height: isNavCollapsed ? `120px` : `0px` } : undefined}
                >
                    {navigationLinks.map((link) => (
                        <NavigationMenuItem key={link.path}>
                            <Link href={link.path} legacyBehavior passHref className="w-full">
                                <NavigationMenuLink
                                    className={cn(navigationMenuTriggerStyle(), "bg-transparent", pathname === link.path && "font-bold text-primary")}
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