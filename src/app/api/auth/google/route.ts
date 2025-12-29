import { NextResponse } from "next/server";

export async function GET() {
  const redirectUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  redirectUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
  redirectUrl.searchParams.set("redirect_uri", `${appUrl}/api/auth/google/callback`);
  redirectUrl.searchParams.set("response_type", "code");
  redirectUrl.searchParams.set("scope", "openid email profile");

  return NextResponse.redirect(redirectUrl.toString());
}
