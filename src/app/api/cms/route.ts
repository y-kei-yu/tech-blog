import { NextResponse } from "next/server";

type MicroCMSItem = {
  id: string;
  title: string;
  description: string;
  content: string;
};

export async function GET(req: Request) {
  const apiURL = process.env.MICROCMS_API_URL;
  const apiKey = process.env.MICROCMS_API_KEY;
  console.log("MicroCMS API URL:", apiURL);

  // 環境変数が未設定なら 500 で返す
  if (!apiURL || !apiKey) {
    return NextResponse.json(
      { error: "MICROCMS_API_URL or MICROCMS_API_KEY is not set" },
      { status: 500 },
    );
  }

  // クエリパラメータを取得
  const { searchParams } = new URL(req.url);

  // 初期画面用に per_page は任意（未指定なら 4）
  const perPageRaw = searchParams.get("per_page");
  const pageRaw = searchParams.get("page");
  const perPage = perPageRaw ? Number(perPageRaw) : 4;
  const page = pageRaw ? Number(pageRaw) : 1;

  // パラメータが数値として不正な場合は 400
  if (!Number.isFinite(perPage) || perPage <= 0 || perPage > 100) {
    return NextResponse.json(
      { error: "per_page must be a number between 1 and 100" },
      { status: 400 },
    );
  }
  if (!Number.isFinite(page) || page <= 0) {
    return NextResponse.json(
      { error: "page must be a number greater than 0" },
      { status: 400 },
    );
  }

  // MicroCMS に渡すURLを組み立てる
  const url = `${apiURL}?limit=${perPage}&offset=${(page - 1) * perPage}`;

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
  const microCMSItems: MicroCMSItem[] = await res.json();

  return NextResponse.json(microCMSItems);
}
