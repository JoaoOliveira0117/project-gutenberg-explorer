import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function loginMiddleware(req: NextRequest) {
  const queryToken = req.nextUrl.searchParams.get("token");

  if (!queryToken) {
    return;
  }

  const res = NextResponse.redirect(new URL("/books", req.url));

  res.cookies.set("token", queryToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return res;
}
