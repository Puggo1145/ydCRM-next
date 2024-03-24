import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                name: { label: 'Name', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });

                
                if (res.status === 201 || res.status === 200) {
                    const user = await res.json();

                    return {
                        id: user._id,
                        role: user.role,
                        name: user.name,
                    };
                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            return token;
        },
        async session({session, token}) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            
            return session;
        }
    },
    pages: {
        signIn: '/login',
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };