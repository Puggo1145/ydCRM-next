"use client"

import { PropsWithChildren } from "react";

import Loader from "@/components/loader";

import { useState, useEffect } from "react";

const LoadBeforePageLayout: React.FC<PropsWithChildren> = ({ children }) => {
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
        <>
            {children}
        </>
    );
};

export default LoadBeforePageLayout;