import { NextResponse } from "next/server";

export default async function GET(req: Request) {
  const apiURL = process.env.MICROCMS_API_URL;
  const apiKey = process.env.X_MICROCMS_API_KEY;

  if (!apiURL || !apiKey) {
    return NextResponse.json(
      { error: "MICROCMS_API_URL or X_MICROCMS_API_KEY is not set" },
      { status: 500 },
    );
  }
}
