import { Article } from "@/data/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiURL = process.env.QIITA_API_URL;
  const accessToken = process.env.QIITA_ACCESS_TOKEN;

  const url = `${apiURL}?per_page=4`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken} `,
    },
  });
  console.log(res);
  const data = await res.json();

  // data.map((item: Article) => {
  //   item.thumbnail = item.user.profile_image_url;
  // });

  return NextResponse.json(data);
}
