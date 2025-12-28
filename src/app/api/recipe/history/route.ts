import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const historyKey = `history:${user.userId}`;
    const history = await redis.lrange(historyKey, 0, 4);

    return NextResponse.json({
      success: true,
      history: history || []
    });

  } catch (error) {
    console.error("History API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
