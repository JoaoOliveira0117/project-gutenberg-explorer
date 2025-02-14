import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

async function getBooks() {
  const cookieJar = await cookies()
  const token = cookieJar.get("token")?.value;
  const service = new BookService();
  const data = await service.getBooks(`/favorites`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withErrorHandler(getBooks)