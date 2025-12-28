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
    const rawHistory = await redis.lrange(historyKey, 0, 4);

    const history = rawHistory.map(entry => {
      try {
        return typeof entry === 'string' ? JSON.parse(entry) : entry;
      } catch {
        // Fallback for old string-only entries
        return { food: entry, image: null };
      }
    });

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
