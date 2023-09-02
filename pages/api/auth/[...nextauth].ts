import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { UserSession, IUser } from "@/handler/userInterface";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "johndoe@domain.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "verysecurepassword",
        },
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

          const passwordMatch = await compare(password, user.password as string);

          if (!passwordMatch) throw new Error("Invalid password");
          return user as IUser;
        } catch (ignored) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user as UserSession;
      session.user = user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
