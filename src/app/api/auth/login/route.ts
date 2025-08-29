import { NextRequest, NextResponse } from 'next/server';
import dbConnect  from '@/lib/dbConnect';
import User from '@/models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// This function acts as the "controller" for the POST /api/auth/login endpoint
export async function POST(request: NextRequest) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Get the request body (email and password)
    const body = await request.json();
    const { email, password } = body;

    // 3. Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 4. Find the user in the database
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      // Use a generic message for security to not reveal if the email exists
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // 5. Compare the provided password with the hashed password in the DB
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // 6. If credentials are correct, create a JWT payload
    const tokenPayload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    // 7. Sign the JWT
    // Ensure you have JWT_SECRET in your .env.local file
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: '1d', // Token expires in 1 day
    });

    // 8. Create a success response and set the token in an HTTP-only cookie
    const response = NextResponse.json(
      {
        message: 'Login successful!',
        success: true,
      },
      { status: 200 }
    );

    // Set the cookie for session management
    response.cookies.set('token', token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    return response;

  } catch (error: any) {
    console.error('LOGIN_ERROR:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.', error: error.message },
      { status: 500 }
    );
  }
}
