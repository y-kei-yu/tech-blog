import { fetchArticles } from "@/blogAPI";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/layout/Pagination";


type IndividualsProps = {
    searchParams?: {
        page?: string;
    };
};

export default async function Individuals({ searchParams }: IndividualsProps) {
    const perPage = 8;
    const sp = await Promise.resolve(searchParams)
    const pagRaw = sp?.page;
    const page = pagRaw ? Number(pagRaw) : 1;
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;

    const articles = await fetchArticles(perPage, safePage);
    const hasNextPage = articles.length === perPage;

    console.log(articles)

    return (
        <div className="w-full flex flex-col px-3 my-6">
            <section className="w-full flex flex-col  px-3">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">個人記事一覧</h2>
                </div>
                <ArticleList articles={articles} />
            </section>
            <Pagination currentPage={safePage} hasNextPage={hasNextPage} />
        </div>
    )
}