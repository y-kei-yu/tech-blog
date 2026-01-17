import { Article } from "@/types/Article";
import { NextResponse } from "next/server";

type QiitaItem = {
  id: string;
  title: string;
  created_at: string;
  url: string;
  user: {
    profile_image_url: string;
  };
};

// サムネイルはQiitaから取得しない（要件）ので固定値を使用
const FALLBACK_THUMBNAIL = "https://example.com/img.png";

export async function GET(req: Request) {
  const apiURL = process.env.QIITA_API_URL;
  const accessToken = process.env.QIITA_ACCESS_TOKEN;

  // 環境変数が未設定なら 500 で返す
  if (!apiURL || !accessToken) {
    return NextResponse.json(
      { error: "QIITA_API_URL or QIITA_ACCESS_TOKEN is not set" },
      { status: 500 }
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
      { status: 400 }
    );
  }
  if (!Number.isFinite(page) || page <= 0) {
    return NextResponse.json(
      { error: "page must be a number greater than 0" },
      { status: 400 }
    );
  }

  // Qiita API に渡すURLを組み立てる
  const url = `${apiURL}?per_page=${perPage}&page=${page}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  // Qiita側エラーをそのまま返す
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { error: "Failed to fetch from Qiita", status: res.status, detail: text },
      { status: res.status }
    );
  }

  const qiitaItems: QiitaItem[] = await res.json();

  const articles: Article[] = qiitaItems.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.created_at,
    url: item.url,
    thumbnail: FALLBACK_THUMBNAIL,
  }));

  return NextResponse.json(articles);
}
