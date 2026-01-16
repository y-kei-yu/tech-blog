import { getAllArticles } from "@/blogAPI";

export default async function Individuals() {
    const articles = await getAllArticles();
    console.log(articles);

    return (
        <div>個人記事一覧</div>
    )
}