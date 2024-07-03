import { authMiddleware } from "@repo/ui/src/middlewares/authMiddleware";
import { chain } from "@repo/ui/src/middlewares/chain";
import { privateMiddleware } from "@repo/ui/src/middlewares/privateMiddleware";
import { protectedMiddleware } from "@repo/ui/src/middlewares/protectedMiddleware";

export default chain([authMiddleware, protectedMiddleware, privateMiddleware]);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|api|trpc).*)", "/", "/:path*"],
};
