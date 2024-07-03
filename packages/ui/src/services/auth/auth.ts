import { authOptions } from "@repo/ui/src/services/auth/auth.config";
import NextAuth from "next-auth";

export const handler = NextAuth({
  ...authOptions,
});
