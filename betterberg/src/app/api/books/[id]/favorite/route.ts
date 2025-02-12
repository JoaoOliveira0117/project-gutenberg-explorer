import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

async function favoriteBook(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await BookService.getInstance();
  await service.putBookFavorite(id);
  return NextResponse.json({ success: true });
}

async function removeFavoriteBook(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await BookService.getInstance();
  await service.deleteBookFavorite(id);
  return NextResponse.json({ success: true });
}

export const PUT = withErrorHandler(favoriteBook);
export const DELETE = withErrorHandler(removeFavoriteBook);