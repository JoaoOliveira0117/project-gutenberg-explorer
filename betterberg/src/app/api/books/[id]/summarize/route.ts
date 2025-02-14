import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

async function summarizeBook(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await BookService.getInstance();
  const data = await service.aiSummarizeBook(id);
  return NextResponse.json(data);
}

export const GET = withErrorHandler(summarizeBook);