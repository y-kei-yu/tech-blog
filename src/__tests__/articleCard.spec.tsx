import { ArticleCard } from "@/app/components/ArticleCard";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

const mockArticle = {
    id: "test-id",
    title: "Test Article",
    date: "2024-06-01",
    url: "https://example.com",
    thumbnail: "https://example.com/thumb.png",
};

describe("ArticleCard", () => {
    test("タイトルが表示される", () => {
        render(<ArticleCard article={mockArticle} />);

        expect(screen.getByText("Test Article")).toBeInTheDocument();
    });

    test("日付が表示される", () => {
        render(<ArticleCard article={mockArticle} />);
        expect(screen.getByText("2024-06-01")).toBeInTheDocument();
    });


    test("サムネイル画像が表示される", () => {
        render(<ArticleCard article={mockArticle} />);
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", mockArticle.thumbnail);
        expect(img).toHaveAttribute("alt", mockArticle.title);
    });

    test("記事リンクが設定されている", () => {
        render(<ArticleCard article={mockArticle} />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", mockArticle.url);
    });
});