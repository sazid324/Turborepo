import "next-auth";

declare module "next-auth" {
  import { User } from "next-auth";

  interface User {
    user_id: string;
    email: string;
    phone: string;
    user?: User;
  }

  interface Session {
    refreshToken?: string;
    accessToken?: string;
    error?: string;
    user?: User;
  }

  interface User extends User, Session {}
}

declare module "next-auth/jwt" {
  import { User } from "next-auth";

  interface JWT {
    refreshToken?: string;
    accessToken: string;
    expires: string;
    exp: number;
    iat: number;
    jti: string;
    user: User;
  }

  interface JWT extends JWT {}
}
