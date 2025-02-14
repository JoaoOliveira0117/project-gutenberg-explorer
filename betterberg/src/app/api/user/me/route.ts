import UserService from "@/services/userService";
import withErrorHandler from "@/utils/withErrorHandler";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

async function getUserMe() {
  const cookieJar = await cookies()
  const token = cookieJar.get("token")?.value;
  const service = new UserService();
  const data = await service.getUserByToken({
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withErrorHandler(getUserMe)