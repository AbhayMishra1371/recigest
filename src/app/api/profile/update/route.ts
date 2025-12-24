import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/users";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const userPayload = await getUserFromToken();
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { isPrivate } = await req.json();

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      userPayload.userId,
      { isPrivate },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        isPrivate: updatedUser.isPrivate,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
