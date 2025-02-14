import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function favoriteBook(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieJar = await cookies()
  const token = cookieJar.get("token")?.value;
  const { id } = await params;
  const service = await BookService.getInstance();
  await service.putBookFavorite(id, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
}

async function removeFavoriteBook(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieJar = await cookies()
  const token = cookieJar.get("token")?.value;
  const { id } = await params;
  const service = await BookService.getInstance();
  await service.deleteBookFavorite(id, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
}

export const PUT = withErrorHandler(favoriteBook);
export const DELETE = withErrorHandler(removeFavoriteBook);