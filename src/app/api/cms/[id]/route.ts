import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiURL = process.env.MICROCMS_API_URL;
  const apiKey = process.env.MICROCMS_API_KEY;

  // 環境変数が未設定なら 500 で返す
  if (!apiURL || !apiKey) {
    return NextResponse.json(
      { error: "MICROCMS_API_URL or MICROCMS_API_KEY is not set" },
      { status: 500 },
    );
  }
  // api/cms/{id} へのリクエストURLから記事idを取得し、MicroCMSの詳細取得API用URLを作成する
  const url = `${apiURL}/${request.url.split("/").pop()}`;
  console.log("Request URL:", request.url);
  console.log("MicroCMS Detail API URL:", url);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
    cache: "no-store",
  });

  // MicroCMS側エラーをそのまま返す
  if (!res.ok) {
    return NextResponse.json(
      {
        error: `Failed to fetch from MicroCMS: ${res.status} ${res.statusText}`,
      },
      { status: res.status },
    );
  }
  const data = await res.json();
  console.log("MicroCMS Detail Data:", data);
  return NextResponse.json(data);
}
