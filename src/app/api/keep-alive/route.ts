import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Optional security token check if KEEP_ALIVE_SECRET is configured
  const secret = process.env.KEEP_ALIVE_SECRET;
  if (secret) {
    const authHeader = request.headers.get("authorization");
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token") || authHeader?.replace(/^Bearer\s+/i, "");
    if (token !== secret) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({
      success: true,
      message: "Supabase not configured locally/in env, keep-alive skipped.",
    });
  }

  try {
    // Perform a lightweight query to keep the Supabase database active
    const { data, error } = await supabase
      .from("company_offices")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Database pinged successfully to keep active.",
      data: data,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
