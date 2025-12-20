import { NextResponse } from "next/server";
import { POPULAR_SUGGESTIONS } from "@/lib/constants";
import redis from "@/lib/redis";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query || query.trim() === "") {
    return NextResponse.json([]);
  }

  const lowerQuery = query.toLowerCase();
  const cacheKey = `suggestions:${lowerQuery}`;

  try {
    // 1. Try fetching from cache
    const cachedSuggestions = await redis.get<string[]>(cacheKey);
    if (cachedSuggestions) {
      console.log(`Suggestion Cache Hit for: ${query}`);
      return NextResponse.json(cachedSuggestions);
    }
    
    console.log(`Suggestion Cache Miss for: ${query}`);

    // 2. If not in cache, compute results
    const filteredSuggestions = POPULAR_SUGGESTIONS.filter((item) =>
      item.toLowerCase().includes(lowerQuery)
    ).slice(0, 5); // Limit to 5 suggestions

    // 3. Store in cache (24 hours TTL)
    await redis.set(cacheKey, filteredSuggestions, { ex: 86400 });

    return NextResponse.json(filteredSuggestions);

  } catch (error) {
    console.error("Redis Error in Suggestions:", error);
    // Fallback to non-cached calculation if Redis fails
    const filteredSuggestions = POPULAR_SUGGESTIONS.filter((item) =>
      item.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);
    return NextResponse.json(filteredSuggestions);
  }
}
