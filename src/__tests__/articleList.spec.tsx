import * as mock from "@/app/components/ArticleCard";
import ArticleList from "@/app/components/ArticleList";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";


vi.mock("@/app/components/ArticleCard", () => ({
    ArticleCard: vi.fn(() => null),
}));

const mockArticles = [
    {
        id: "article-1",
        title: "Article 1",
        date: "2026-02-06",
        url: "https://example.com/article-1",
        thumbnail: "https://example.com/thumb1.png",
    },
    {
        id: "article-2",
        title: "Article 2",
        date: "2026-02-07",
        url: "https://example.com/article-2",
        thumbnail: "https://example.com/thumb2.png",
    },
    {
        id: "article-3",
        title: "Article 3",
        date: "2026-02-08",
        url: "https://example.com/article-3",
        thumbnail: "https://example.com/thumb3.png",
    },
]
const mockedArticleCard = vi.mocked(mock.ArticleCard);

describe("ArticleList", () => {
    // セッションの初期化
    beforeEach(() => {
        mockedArticleCard.mockClear();
    });
    test("articlesの件数分、ArticleCardが呼ばれる", () => {
        render(<ArticleList articles={mockArticles} />);
        console.log(mockedArticleCard.mock.calls);
        expect(mockedArticleCard).toHaveBeenCalledTimes(3);
    });
    test("記事が０件の時は何も表示されない", () => {
        render(<ArticleList articles={[]} />);
        expect(mockedArticleCard).not.toHaveBeenCalled();
    });
    test("記事が1件のとき1件だけ表示される", () => {
        render(<ArticleList articles={[mockArticles[0]]} />);
        expect(mockedArticleCard).toHaveBeenCalledTimes(1);
    });
});