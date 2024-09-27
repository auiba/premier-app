import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import Resend from "next-auth/providers/resend";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Resend({ from: "Premierapp <hola@premier.nitsuga.dev>" })],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {},
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
});
