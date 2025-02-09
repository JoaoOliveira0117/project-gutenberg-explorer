import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const response = await fetch(`https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`)

    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }

    const text = await response.text();
    return NextResponse.json(text);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}
