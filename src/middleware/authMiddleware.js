import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function authMiddleware(request) {
  // 1. Get the token from the cookies
  const token = request.cookies.get('jwt-token')?.value;

  // 2. If no token, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Verify the token
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    
    // If verification is successful, allow the request to proceed
    return null; // Returning null signals to proceed to the next middleware or page
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    // If verification fails, redirect to the login page
    const loginUrl = new URL('/login', request.url);
    // Clear the invalid cookie
    loginUrl.searchParams.set('redirected', 'true');
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('jwt-token');
    return response;
  }
}