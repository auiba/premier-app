import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import Resend from "next-auth/providers/resend";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Resend({
      from: "Premierapp <hola@premier.nitsuga.dev>",
      sendVerificationRequest: async ({ identifier: emails, url }) => {
        const newUrl = new URL(url);
        const newSearchParams: URLSearchParams = new URLSearchParams(
          newUrl.search
        );
        const newToken = newSearchParams.get("token") || "";
        const newEmail = newSearchParams.get("email") || "";

        const res = await fetch(`${baseUrl}/api/emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tkn: newToken,
            email: newEmail,
            subject: "Ingreso",
          }),
        });
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {},
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
});
