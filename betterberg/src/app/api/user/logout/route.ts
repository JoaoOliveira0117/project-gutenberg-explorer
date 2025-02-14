import UserService from "@/services/userService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

async function logout() {
  const service = await UserService.getInstance()
  service.logout();
  return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" }});
}

export const GET = withErrorHandler(logout)