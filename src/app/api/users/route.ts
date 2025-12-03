import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import User from '@/models/users';

export async function POST(req:Request) {
  try {
    await connectDB();

    const { name, email } = await req.json();

    const newUser = await User.create({ name, email });

    return NextResponse.json({ success: true, data: newUser });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({});

    return NextResponse.json({ success: true, data: users });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
