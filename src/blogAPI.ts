import { Article } from "./types/Article";

export const fetchArticles = async (): Promise<Article[]> => {
  // json-serverから記事データを取得
  //const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" });
  // QiitaAPIから記事データを取得
  const res = await fetch(`http://localhost:3000/api/qiita`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  const articles = await res.json();
  return articles;
};
