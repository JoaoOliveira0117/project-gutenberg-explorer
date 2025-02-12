import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const { id } = await params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + cookieStore.get('token')?.value,
      }
    })

    const data = await response.json()
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}
