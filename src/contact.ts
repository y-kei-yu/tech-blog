import { Article } from "./types/Article";
import { BlogDetail } from "./types/BlogDetail";

//Qiita一覧ページ用
export const fetchArticles = async (
  // 1ページに何件データを表示するか
  perPage: number,
  // 何ページ目のデータを取得するか
  page: number,
): Promise<Article[]> => {
  // json-serverから記事データを取得
  //const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" });

  const baseURL = process.env.BASE_URL;

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
  const baseURL = process.env.BASE_URL;

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
  const baseURL = process.env.BASE_URL;

  // MicroCMSから記事データを取得
  const res = await fetch(`${baseURL}/api/cms/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch blog detail from MicroCMS");
  }
  const blogDetail: BlogDetail = await res.json();
  return blogDetail;
};
