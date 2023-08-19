import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { 
        email: { label: "Username", type: "text", placeholder: "johndoe@domain.com" },
        password: { label: "Password", type: "password", placeholder: "verysecurepassword" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) throw new Error("No credentials to log in as");
          const { email, password } = credentials;
          const user = await prisma.user.findFirst({
            where: {
              email,
            },
          });
          if (!user) throw new Error("User not found");

          const passwordMatch = await compare(password, user.password);

          if (!passwordMatch) throw new Error("Invalid password");
          return user as any;
        } catch (ignored) {
          return null;
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login"
},
session: {
    strategy: "jwt"
},
callbacks: {
    jwt:async ({token, user}) => {
        user && (token.user = user)
        return token
    },
    session:async ({session, token}) => {
        const user = token.user as any
        session.user = user
        return session
    }
}
});
