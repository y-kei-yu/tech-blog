import { fetchArticles, fetchMicroCMSArticles } from "../contact";
import ArticleList from "./components/ArticleList";
import Morebutton from "./components/layout/Morebutton";

export default async function Page() {
  const articles = await fetchArticles(4, 1);
  const microCMSArticles = await fetchMicroCMSArticles(4, 1);
  console.log("microCMSArticles:", microCMSArticles);

  // エラーを意図的に発生させる
  // throw new Error('Test error handling');

  return (
    <>
      <div className="w-full flex flex-col px-3 my-6">
        <section className="w-full flex flex-col  px-3">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">個人記事</h2>
            <Morebutton href="/individuals" />
          </div>
          <ArticleList articles={articles} />
        </section>
        <section className="w-full flex flex-col  px-3 mt-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">ブログ記事</h2>
            <Morebutton href="/blogs" />
          </div>
          <ArticleList articles={microCMSArticles} />
        </section>
      </div>
    </>
  );
}
