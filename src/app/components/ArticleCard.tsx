import { Article } from "@/types/Article";
import Link from "next/link";


export const ArticleCard = ({ article }: { article: Article }) => {
    return (
        <div className="card bg-base-100 shadow-sm hover:bg-gray-200 transition-all duration-300">
            <Link href={article.url} >
                <figure className="w-full aspect-[1200/630] overflow-hidden bg-gray-100">
                    <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-contain"
                    />

                </figure>
                <div className="card-body">
                    <p>{article.date}</p>
                    <h2 className="card-title">{article.title}</h2>
                </div>
            </Link>
        </div>
    )
}
