import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

async function getBookById(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const service = await BookService.getInstance()
  const data = await service.getBookById(id, `?${searchParams.toString()}`);
  return NextResponse.json(data);
}

export const GET = withErrorHandler(getBookById)