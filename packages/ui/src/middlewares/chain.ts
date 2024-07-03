import { NextMiddleware, NextResponse } from "next/server";

// eslint-disable-next-line no-unused-vars
export type middlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export function chain(
  functions: middlewareFactory[],
  index = 0,
): NextMiddleware {
  const current = functions[index];

  if (current) {
    const next: NextMiddleware = chain(functions, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}
