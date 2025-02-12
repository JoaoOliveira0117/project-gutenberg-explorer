import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })

    if (!response.ok) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const data = await response.json()
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}
