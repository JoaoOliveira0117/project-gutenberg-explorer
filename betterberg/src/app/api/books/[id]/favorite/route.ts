import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}/favorite`, {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + cookieStore.get('token')?.value,
      }
    })

    if(!response.ok) {
      throw new Error("Failed to update book favorite status");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}/favorite`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + cookieStore.get('token')?.value,
      }
    })

    if(!response.ok) {
      throw new Error("Failed to update book favorite status");
    }

    const data = await response.json()
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}