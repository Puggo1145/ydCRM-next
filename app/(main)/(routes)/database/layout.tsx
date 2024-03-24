"use client"

import { PropsWithChildren } from "react";

import Loader from "@/components/loader";

import { useState, useEffect } from "react";

const DatabaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <div className="p-4 h-full flex flex-col gap-y-4">
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default DatabaseLayout;