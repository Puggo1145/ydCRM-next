import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
                        id: user.id,
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
            }

            return token;
        },
        async session({session, token}) {
            // @ts-expect-error ts 下 session 取不到 id
            session.user.id = token.id;
            
            return session;
        }
    },
})

export { handler as GET, handler as POST };