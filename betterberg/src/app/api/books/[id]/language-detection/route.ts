import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function detectLanguagesOfBook(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieJar = await cookies()
  const token = cookieJar.get("token")?.value;
  const { id } = await params;
  const service = await BookService.getInstance();
  const data = await service.aiDetectLanguagesOfBook(id, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withErrorHandler(detectLanguagesOfBook);