import UserService from "@/services/userService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

async function getUserMe() {
  const service = await UserService.getInstance()
  const data = await service.getUserMe();
  return NextResponse.json(data);
}

export const GET = withErrorHandler(getUserMe)