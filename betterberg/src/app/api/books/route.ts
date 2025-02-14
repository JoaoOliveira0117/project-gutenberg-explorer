import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

async function getBooks(req: NextRequest) {
  const cookieJar = await cookies()
  const token = cookieJar.get("token")?.value;
  const { searchParams } = new URL(req.url);
  const service = await BookService.getInstance()
  const data = await service.getBooks(`?${searchParams.toString()}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withErrorHandler(getBooks)