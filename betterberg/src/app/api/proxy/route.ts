import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing book ID" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`);
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }

    const text = await response.text();

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}
