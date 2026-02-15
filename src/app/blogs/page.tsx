import { fetchMicroCMSArticles } from "@/contact";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/layout/Pagination";

type BlogsProps = {
    searchParams?: {
        page?: string
    };
}

export default async function Blogs({ searchParams }: BlogsProps) {

    const perPage = 8;
    const resolevedSearchParams = Promise.resolve(searchParams);

    const pageParam = (await resolevedSearchParams)?.page;

    const pageNumber = pageParam ? Number(pageParam) : 1;

    const safePage = Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1;
    const microCMSArticles = await fetchMicroCMSArticles(perPage, safePage);
    const hasNextPage = microCMSArticles.length === perPage;

    return (
        <div className="w-full flex flex-col px-3 my-6">
            <section className="w-full flex flex-col  px-3">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">ブログ記事一覧</h2>
                </div>
                <ArticleList articles={microCMSArticles} />
            </section>
            <Pagination currentPage={safePage} hasNextPage={hasNextPage} />
        </div>
    )
}
