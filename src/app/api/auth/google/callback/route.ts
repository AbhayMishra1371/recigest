import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const { origin } = url;
    const code = url.searchParams.get("code");

    if (!code) throw new Error("No code returned");

    // exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${origin}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    if (tokens.error) {
      console.error("TOKEN ERROR:", tokens);
      throw new Error(tokens.error_description || tokens.error);
    }

    const userInfoResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );

    const profile = await userInfoResponse.json();
    console.log("PROFILE:", profile);

    
    const res = NextResponse.redirect(origin);
    
    const token = jwt.sign(
  { name: profile.name, email: profile.email, picture: profile.picture },
  process.env.JWT_SECRET!,
  { expiresIn: "7d" }
);
    
  res.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: "none", 
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});


    return res;

  } catch (err) {
    console.error("GOOGLE CALLBACK ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
