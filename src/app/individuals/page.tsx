import { fetchArticles } from "@/contact";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/layout/Pagination";

//Individualsページに渡される props の型 （URL のクエリ文字列）
type IndividualsProps = {
    searchParams?: {
        page?: string;
    };
};

export default async function Individuals({ searchParams }: IndividualsProps) {
    // 1ページあたりの記事数
    const perPage = 8;
    // Promise で渡された場合に備えて解決する
    const resolvedSearchParams = await Promise.resolve(searchParams)
    // URL の ?page=◯ を文字列として取得
    const pageParam = resolvedSearchParams?.page;

    const pageNumber = pageParam ? Number(pageParam) : 1;

    // pageNumber が有限の数値かつ 1 以上であることを確認
    const safePage = Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1;

    const articles = await fetchArticles(perPage, safePage);
    const hasNextPage = articles.length === perPage;

    return (
        <div className="w-full flex flex-col px-3 my-6">
            <section className="w-full flex flex-col px-3">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">個人記事一覧</h2>
                </div>
                <ArticleList articles={articles} />
            </section>

            <div className="px-3 mt-6">
                <Pagination currentPage={safePage} hasNextPage={hasNextPage} />
            </div>
        </div>
    )
}
