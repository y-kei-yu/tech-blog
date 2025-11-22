import { getAllArticles } from "../blogAPI";
import ArticleList from "./components/ArticleList";

export default async function Page() {
  const articles = await getAllArticles();
  console.log(articles);

  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      <section className="w-full flex flex-col items-center px-3">
        <ArticleList articles={articles} />
      </section>


    </>
  );
}
