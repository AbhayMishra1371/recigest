import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({
      authenticated: true,
      user: decoded,
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false });
  }
}
