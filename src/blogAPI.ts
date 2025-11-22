import { Article } from "./data/types";

export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" });
  const articles = await res.json();
  return articles;
};
