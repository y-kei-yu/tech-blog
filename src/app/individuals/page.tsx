import { fetchArticles } from "@/blogAPI";

export default async function Individuals() {
    const articles = await fetchArticles();
    console.log(articles);

    return (
        <div>個人記事一覧</div>
    )
}