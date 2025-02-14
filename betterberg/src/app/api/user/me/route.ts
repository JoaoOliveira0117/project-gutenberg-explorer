import UserService from "@/services/userService";
import withErrorHandler from "@/utils/withErrorHandler";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

async function getUserMe(req: NextRequest) {
  const cookieJar = await cookies()
  const token = cookieJar.get("token")?.value;
  const service = await UserService.getInstance();
  const data = await service.getUserByToken({
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withErrorHandler(getUserMe)