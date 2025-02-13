import BookService from "@/services/bookService";
import withErrorHandler from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

async function analyzeSemanticsOfBook(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await BookService.getInstance();
  await service.aiAnalyzeSemanticsOfBook(id);
  return NextResponse.json({ success: true });
}

export const GET = withErrorHandler(analyzeSemanticsOfBook);