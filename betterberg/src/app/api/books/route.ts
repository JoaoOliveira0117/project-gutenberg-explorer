import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')

  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;

  if (!userId) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const query = new URLSearchParams({
      ...(search ? { search } : {}),
      ...(page ? { page } : {}),
      ...(pageSize ? { pageSize } : {}),
      user_id: userId
    })

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books?${query.toString()}`, {
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
