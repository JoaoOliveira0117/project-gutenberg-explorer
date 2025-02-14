import UserService from "@/services/userService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextResponse } from "next/server";

async function logout() {
  const service = await UserService.getInstance()
  const data = await service.logout();
  return NextResponse.json(data);
}

export const GET = withErrorHandler(logout)