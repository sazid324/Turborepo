import { dashboardAppUrls } from "@repo/dashboard/lib/config/appUrls";
import { sharedAppUrls } from "@repo/ui/src/lib/config/appUrls";
import { stringStartsWith } from "@repo/ui/src/lib/utils/functions";
import { getToken } from "next-auth/jwt";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function protectedMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const token = (await getToken({ req: request })) as {
      user: { user_type: number };
    };
    const url = request.nextUrl;
    const protectedPaths = Object.values(dashboardAppUrls.PROTECTED);
    const isValidProtectedUrl =
      protectedPaths.includes(url.pathname) ||
      stringStartsWith(url.pathname, protectedPaths);
    const userType = token?.user.user_type;

    if (!token && isValidProtectedUrl) {
      return NextResponse.redirect(
        new URL(sharedAppUrls.AUTH.SIGNIN, request.url),
      );
    }

    if (userType && isValidProtectedUrl) {
      const userRoutes: { [key: number]: string } = {
        1: dashboardAppUrls.PROTECTED.ADMIN,
        2: dashboardAppUrls.PROTECTED.MANAGER,
        3: dashboardAppUrls.PROTECTED.VENDOR,
        4: dashboardAppUrls.PROTECTED.USER,
      };

      const redirectRoute = userRoutes[userType];
      if (redirectRoute && url.pathname !== redirectRoute) {
        return NextResponse.redirect(new URL(redirectRoute, request.url));
      }
    }

    return middleware(request, event);
  };
}
