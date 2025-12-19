import { NextResponse } from "next/server";

export async function POST() {
  // remove the token cookie
  const response = NextResponse.json({ success: true, message: "Logged out" });

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // expired cookie
    path: "/",
  });

  return response;
}
