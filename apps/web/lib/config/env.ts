/* eslint-disable turbo/no-undeclared-env-vars */
export const envConfig = Object.freeze({
  NEXT_PUBLIC_BASE_FRONTEND_URL: process.env
    .NEXT_PUBLIC_BASE_FRONTEND_URL as string,
  NEXT_PUBLIC_BASE_BACKEND_URL: process.env
    .NEXT_PUBLIC_BASE_BACKEND_URL as string,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  FILE_SERVER: process.env.NEXT_FILE_SERVER_URL,
  PUBLIC_USERID_SECRET: process.env.NEXT_PUBLIC_URL_USERID_SECRET,
});
