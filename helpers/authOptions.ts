import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { Role, UserStatus } from "@/types";


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: Role | null;
      picture?: string | null;
      phone?: string | null;
      status?: UserStatus | null;
      isVerified?: boolean | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: Role | null;
    picture?: string | null;
    phone?: string | null;
    status?: UserStatus | null;
    isVerified?: boolean | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.error("Email or Password is missing");
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
          console.log("Response From Backend:", res);
          if (!res?.ok) {
            console.error("Login Failed", await res.text());
            return null;
          }

          const user = await res.json();
          if (user.id) {
            return {
              id: user?.id,
              name: user?.name,
              email: user?.email,
              role: user?.role,
              picture: user?.picture,
              phone: user?.phone,
              status: user?.status,
              isVerified: user?.isVerified,
            };
          } else {
            return null;
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.role = user?.role;
        token.picture = user?.picture;
        token.status = user?.status;
        token.phone = user?.phone;
        token.isVerified = user?.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token?.id as string;
        session.user.role = token?.role as Role;
        session.user.picture = token?.picture as string;
        session.user.status = token?.status as UserStatus;
        session.user.phone = token?.phone as string;
        session.user.isVerified = token?.isVerified as boolean;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            picture: user.image,
          }),
        });

        const data = await res.json();
        user.id = data.id;
        user.name = data.name;
        user.role = data.role;
        user.picture = data.picture;
        user.phone = data.phone;
        user.status = data.status;
        user.isVerified = data.isVerified;
      }

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};