import UserService from "@/services/userService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

async function getUserMe(req: NextRequest) {
  const service = await UserService.getInstance()
  const data = await service.getUserMe();
  return NextResponse.json(data);
}

export const GET = withErrorHandler(getUserMe)