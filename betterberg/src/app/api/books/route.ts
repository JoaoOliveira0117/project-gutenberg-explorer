import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

async function getBooks(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const service = await BookService.getInstance()
  const data = await service.getBooks(`?${searchParams.toString()}`);
  return NextResponse.json(data);
}

export const GET = withErrorHandler(getBooks)