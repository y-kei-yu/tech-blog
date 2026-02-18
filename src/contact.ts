import { Article } from "./types/Article";
import { BlogDetail } from "./types/BlogDetail";
import { headers } from "next/headers";

/**
 * Server Component / Route Handler では相対パス ("/api/...") が使用できないため、
 * 現在の実行環境に応じた絶対URLを組み立てる。
 *
 * - 開発環境 (localhost)
 * - 本番環境 (Firebase / Hosting ドメイン)
 *
 * 環境変数 BASE_URL があればそれを優先し、
 * なければリクエストヘッダーから現在のホスト情報を取得して動的にURLを生成する。
 */
const getBaseURL = async (): Promise<string> => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }

  const headerStore = await headers();
  console.log("headerStore", headerStore);
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  console.log("host", host);
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";
  console.log("protocol", protocol);

  if (host) {
    return `${protocol}://${host}`;
  }

  return "http://localhost:3000";
};

//Qiita一覧ページ用
export const fetchArticles = async (
  // 1ページに何件データを表示するか
  perPage: number,
  // 何ページ目のデータを取得するか
  page: number,
): Promise<Article[]> => {
  // json-serverから記事データを取得
  //const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" });
  const baseURL = await getBaseURL();

  // QiitaAPIから記事データを取得
  const res = await fetch(
    `${baseURL}/api/qiita?per_page=${perPage}&page=${page}`,
    {
      next: { revalidate: 300 }, // 60秒ごとにデータを再検証
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  const articles: Article[] = await res.json();
  return articles;
};

// MicroCMS一覧表示用
export const fetchMicroCMSArticles = async (
  // 1ページに何件データを表示するか
  perPage: number,
  // 何ページ目のデータを取得するか
  page: number,
): Promise<Article[]> => {
  const baseURL = await getBaseURL();

  // /api/cms (route.ts) を呼び出し、MicroCMSの一覧データを取得する
  const res = await fetch(
    `${baseURL}/api/cms?per_page=${perPage}&page=${page}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch articles from MicroCMS");
  }
  const articles: Article[] = await res.json();
  return articles;
};

// MicroCMSブログ詳細ページ表示用
export const fetchMicroCMSBlogDetail = async (
  id: string,
): Promise<BlogDetail> => {
  const baseURL = await getBaseURL();

  // MicroCMSから記事データを取得
  const res = await fetch(`${baseURL}/api/cms/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch blog detail from MicroCMS");
  }
  const blogDetail: BlogDetail = await res.json();
  return blogDetail;
};
