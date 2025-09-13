import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      email: string;
      role: string;
      emailVerified: Date | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    emailVerified: Date | null;
  }
}
export type LoginState =
  | { error: string; success?: undefined; url?: undefined }
  | { error: null; success: true; url: string }
  | null;