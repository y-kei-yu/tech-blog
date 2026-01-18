import { fetchArticles } from "@/blogAPI";
import ArticleList from "../components/ArticleList";

export default async function Individuals() {
    const articles = await fetchArticles(8, 1);
    console.log(articles);

    return (
        <div className="w-full flex flex-col px-3 my-6">
            <section className="w-full flex flex-col  px-3">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">個人記事一覧</h2>
                </div>
                <ArticleList articles={articles} />
            </section>
        </div>
    )
}