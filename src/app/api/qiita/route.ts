import { Article } from "@/types/Article";
import { NextResponse } from "next/server";

type QiitaData = {
  id: string;
  title: string;
  created_at: string;
  url: string;
  user: {
    profile_image_url: string;
  };
};

export async function GET(req: Request) {
  const apiURL = process.env.QIITA_API_URL;
  const accessToken = process.env.QIITA_ACCESS_TOKEN;

  const url = `${apiURL}?per_page=4`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log([0]);
  const QiitaData = await res.json();

  const articles: Article[] = QiitaData.map((item: QiitaData) => ({
    id: item.id,
    title: item.title,
    date: item.created_at,
    url: item.url,
    thumbnail: item.user.profile_image_url,
  }));

  return NextResponse.json(articles);
}
