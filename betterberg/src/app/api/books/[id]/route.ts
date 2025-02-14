import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

async function getBookById(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieJar = await cookies()
  const token = cookieJar.get("token")?.value;
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const service = new BookService();
  const data = await service.getBookById(id, `?${searchParams.toString()}`,{
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withErrorHandler(getBookById)