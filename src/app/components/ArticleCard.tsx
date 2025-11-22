import { Article } from "@/data/types";


export const ArticleCard = ({ article }: { article: Article }) => {
    return (
        <div className="card bg-base-100 w-80 shadow-sm grid grid-cols-1">
            <figure>
                <img
                    src={article.thumbnail}
                    alt={article.title} />
            </figure>
            <div className="card-body">
                <p>{article.date}</p>
                <h2 className="card-title">{article.title}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            </div>
        </div>
    )
}