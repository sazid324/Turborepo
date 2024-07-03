import { sharedAppUrls } from "@repo/ui/src/lib/config/appUrls";
import { envConfig } from "@repo/ui/src/lib/config/env";
import { stringStartsWith } from "@repo/ui/src/lib/utils/functions";
import { webAppUrls } from "@repo/web/lib/config/appUrls";
import { getToken } from "next-auth/jwt";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function authMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const token = (await getToken({ req: request })) as {
      user: { user_type: number };
    };
    const url = request.nextUrl;
    const authPaths = Object.values(sharedAppUrls.AUTH);
    const isValidAuthUrl =
      authPaths.includes(url.pathname) ||
      stringStartsWith(url.pathname, authPaths);

    if (token && isValidAuthUrl) {
      return NextResponse.redirect(
        new URL(webAppUrls.PUBLIC.HOME, request.url),
      );
    }

    const routesToCheck = [
      {
        path: sharedAppUrls.AUTH.OTP,
        allowedReferrers: [
          sharedAppUrls.AUTH.SIGNUP,
          sharedAppUrls.AUTH.RESET_PASSWORD,
        ],
      },
      {
        path: sharedAppUrls.AUTH.RESET_PASSWORD,
        allowedReferrers: [sharedAppUrls.AUTH.SIGNIN],
      },
      {
        path: sharedAppUrls.AUTH.UPDATE_PASSWORD,
        allowedReferrers: [sharedAppUrls.AUTH.OTP],
      },
    ];

    for (const route of routesToCheck) {
      if (url.pathname === route.path) {
        return redirectIfInvalidReferrer(
          request,
          route.allowedReferrers,
          webAppUrls.PUBLIC.HOME,
        );
      }
    }

    return middleware(request, event);
  };
}

const isValidReferrer = (
  req: NextRequest,
  allowedReferrers: string[],
): boolean => {
  const referrer = req.headers.get("referer");
  if (!referrer) {
    return false;
  }
  return allowedReferrers.some((url) =>
    referrer.startsWith(envConfig.NEXT_PUBLIC_BASE_FRONTEND_URL + url),
  );
};

const redirectIfInvalidReferrer = (
  req: NextRequest,
  allowedReferrers: string[],
  targetPath: string,
) => {
  if (!isValidReferrer(req, allowedReferrers)) {
    return NextResponse.redirect(new URL(targetPath, req.url));
  }
};
