import withErrorHandler from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

async function getBookText(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetch(`https://storage.googleapis.com/guthenberg-texts/books/${id}.txt`)

  const text = await data.text();

  return NextResponse.json(text);
}

export const GET = withErrorHandler(getBookText)