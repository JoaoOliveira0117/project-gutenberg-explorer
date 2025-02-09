import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;

  try {
    const response = await fetch(`http://localhost:3000/api/books/${id}/${userId}/favorite`, {
      method: "PUT",
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
  const userId = cookieStore.get('user_id')?.value;

  try {
    const response = await fetch(`http://localhost:3000/api/books/${id}/${userId}/favorite`, {
      method: "DELETE",
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