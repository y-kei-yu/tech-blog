import { Article } from "@/types/Article";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

type QiitaItem = {
  id: string;
  title: string;
  created_at: string;
  url: string;
  user: {
    profile_image_url: string;
  };
};

const FALLBACK_THUMBNAIL =
  "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9SmF2YVNjcmlwdCVFMyU4MSVBN1VSTCVFMyU4MSU4QiVFMyU4MiU4OU9HUCVFNSU4RiU5NiVFNSVCRSU5NyVFMyU4MSU5OSVFMyU4MiU4QiZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9NDM5YjY5NjY3Nzg3ZTExYzdmYTM2YjI1ZDg3NTcyN2Y&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwa3N5dW5ubm4mdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPWUxMjJhOTA1NDdiNTMzNDI4MWY3YmU0M2U2Y2I1M2Rh&blend-x=142&blend-y=491&blend-mode=normal&s=1a611f7e8833ff640580434a1b03d27a";

// Qiita APIの一覧にはOGP画像URLが入っていないことが多いので、記事ページHTMLを取得して og:image を抜き出する関数
async function fetchQiitaOgpImage(articleUrl: string): Promise<string> {
  try {
    const res = await fetch(articleUrl, {
      method: "GET",
      headers: {
        accept: "text/html",
        "user-agent": "Mozilla/5.0 (OGP Fetcher)",
      },
      next: { revalidate: 86400 }, // 24時間ごとに再検証
    });

    if (!res.ok) return FALLBACK_THUMBNAIL;

    const html = await res.text();
    const $ = cheerio.load(html);

    // <meta property="og:image" content="...">
    const ogImage = $("meta[property='og:image']").attr("content");

    // まれに name="og:image" になっているケースもケア
    const ogImageByName = $("meta[name='og:image']").attr("content");

    if (ogImage && ogImage.length > 0) return ogImage;
    if (ogImageByName && ogImageByName.length > 0) return ogImageByName;

    return FALLBACK_THUMBNAIL;
  } catch (error) {
    console.error("Error fetching Qiita OGP image:", error);

    return FALLBACK_THUMBNAIL;
  }
}

export async function GET(req: Request) {
  const apiURL = process.env.QIITA_API_URL;
  const accessToken = process.env.QIITA_ACCESS_TOKEN;
  console.log("Qiita API URL:", apiURL);

  // 環境変数が未設定なら 500 で返す
  if (!apiURL || !accessToken) {
    return NextResponse.json(
      { error: "QIITA_API_URL or QIITA_ACCESS_TOKEN is not set" },
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
      { status: res.status },
    );
  }

  const qiitaItems: QiitaItem[] = await res.json();

  // Qiita APIの一覧にはOGP画像URLが入っていないことが多いので、
  // 記事ページHTMLを取得して og:image を抜き出す
  const articles: Article[] = await Promise.all(
    qiitaItems.map(async (item) => {
      const ogpImage = await fetchQiitaOgpImage(item.url);

      return {
        id: item.id,
        title: item.title,
        date: item.created_at.substring(0, 10),
        url: item.url,
        thumbnail: ogpImage ?? FALLBACK_THUMBNAIL,
      };
    }),
  );

  return NextResponse.json(articles);
}
