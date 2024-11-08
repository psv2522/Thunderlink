import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "./db";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
      await prisma.userinfo.create({
        data: {
          id: user.id,
          accountId: user.email?.split("@")[0],
        },
      });
    },
    async signIn({ user }) {
      const account = await prisma.account.findFirst({
        where: { userId: user.id }
      });
      
      if (!account) {
        if (!user.name) {
          await prisma.user.update({
            where: { id: user.id },
            data: { name: "John Doe" }
          });
        }

        const existingUserInfo = await prisma.userinfo.findUnique({
          where: { id: user.id }
        });

        if (!existingUserInfo) {
          await prisma.userinfo.create({
            data: {
              id: user.id,
              accountId: user.email?.split("@")[0],
            },
          });
        }
      }
    }
  },
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
} satisfies NextAuthOptions;
