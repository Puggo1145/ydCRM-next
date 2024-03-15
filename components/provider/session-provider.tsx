"use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
    session: Session;
    children: React.ReactNode;
}

const NextAuthProvider: React.FC<ProviderProps> = ({ session, children }) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
};

export default NextAuthProvider;