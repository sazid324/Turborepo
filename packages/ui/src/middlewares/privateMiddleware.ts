import { sharedAppUrls } from "@repo/ui/src/lib/config/appUrls";
import { stringStartsWith } from "@repo/ui/src/lib/utils/functions";
import { webAppUrls } from "@repo/web/lib/config/appUrls";
import { getToken } from "next-auth/jwt";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function privateMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const token = (await getToken({ req: request })) as {
      user: { user_type: number };
    };
    const url = request.nextUrl;
    const privatePaths = Object.values(webAppUrls.PRIVATE);
    const isValidPrivateUrl =
      privatePaths.includes(url.pathname) ||
      stringStartsWith(url.pathname, privatePaths);
    const userType = token?.user.user_type;

    if (!token && isValidPrivateUrl) {
      return NextResponse.redirect(
        new URL(sharedAppUrls.AUTH.SIGNIN, request.url),
      );
    }

    if (token && userType !== 4 && isValidPrivateUrl) {
      return NextResponse.redirect(
        new URL(webAppUrls.PUBLIC.HOME, request.url),
      );
    }

    return middleware(request, event);
  };
}
