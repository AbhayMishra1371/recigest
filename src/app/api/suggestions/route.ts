import { NextResponse } from "next/server";
import { POPULAR_SUGGESTIONS } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query || query.trim() === "") {
    return NextResponse.json([]);
  }

  const lowerQuery = query.toLowerCase();

  const filteredSuggestions = POPULAR_SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(lowerQuery)
  ).slice(0, 5); // Limit to 5 suggestions

  return NextResponse.json(filteredSuggestions);
}
