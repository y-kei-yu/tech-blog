import { Article } from "@/data/types";
import { ArticleCard } from "./ArticleCard";

type ArticleListProps = {
    articles: Article[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
                <ArticleCard article={article} key={article.id} />
            ))}
        </div>
    )
}

export default ArticleList