import withErrorHandler from "@/utils/withErrorHandler";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

async function logout() {
  const res = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return res;
}

export const GET = withErrorHandler(logout)