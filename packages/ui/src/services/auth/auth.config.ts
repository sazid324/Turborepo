import { apiUrls } from "@repo/ui/src/lib/config/apiUrls";
import { sharedAppUrls } from "@repo/ui/src/lib/config/appUrls";
import { envConfig } from "@repo/ui/src/lib/config/env";
import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  debug: false,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter Your Email Here",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Your Password Here",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        try {
          const res = await fetch(
            envConfig.NEXT_PUBLIC_BASE_BACKEND_URL + apiUrls.AUTH.SIGN_IN,
            {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: { "Content-Type": "application/json" },
            },
          );

          if (res.status !== 200) return null;
          return res.json();
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (
        !("user" in user) ||
        !("accessToken" in user) ||
        !("refreshToken" in user)
      ) {
        return token;
      }

      if (trigger === "signIn" && user?.user && user?.accessToken) {
        token = {
          ...token,
          user: user.user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
        return token;
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session = {
          ...session,
          user: token.user as User,
          ...(token.accessToken ? { accessToken: token.accessToken } : {}),
          ...(token.refreshToken ? { refreshToken: token.refreshToken } : {}),
        };
        return session;
      }
      return session;
    },
  },
  jwt: { maxAge: 5 * 60 },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: { signIn: sharedAppUrls.AUTH.SIGNIN },
  secret: envConfig.NEXTAUTH_SECRET,
};
