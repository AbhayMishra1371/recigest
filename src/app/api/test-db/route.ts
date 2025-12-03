import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "DB Connected Successfully 🎉" });
  } catch (error) {
    console.error("DB connection failed:", error);
    return NextResponse.json(
      { message: "DB Connection Failed ❌" },
      { status: 500 }
    );
  }
}
