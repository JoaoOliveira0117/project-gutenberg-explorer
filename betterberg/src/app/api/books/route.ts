import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getBooks(_: NextRequest) {
  const service = await BookService.getInstance()
  const data = await service.getBooks();
  return NextResponse.json(data);
}

export const GET = withErrorHandler(getBooks)