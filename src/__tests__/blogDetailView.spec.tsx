import BlogDetailView from "@/app/components/BlogDetailView";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";


vi.mock("next/image", () => {
    return {
        default: ({ src, alt }: { src: string; alt: string }) => {
            return <img src={src} alt={alt} />;
        }
    };
})
const mockMicroCMSBlogDetailView = {
    id: 'test-id',
    createdAt: '2026-02-13',
    updatedAt: '2026-02-14',
    publishedAt: '2026-02-14',
    revisedAt: '2026-02-14',
    title: 'Test Blog Detail',
    description: 'This is a test blog detail description.',
    content: '<p>This is the content of the test blog detail.</p>',
    thumbnail: {
        url: 'https://example.com/thumbnail.png',
        height: 800,
        width: 600,
    },
    tags: ['test', 'blog', 'detail'],
    writer: 'Test Writer',

}

describe("blogDetailView", () => {
    test("タイトルが表示される", () => {
        render(<BlogDetailView microCMSBlogDetail={mockMicroCMSBlogDetailView} />);
        expect(screen.getByText("Test Blog Detail")).toBeInTheDocument();
    });
    test("説明文が表示される", () => {
        render(<BlogDetailView microCMSBlogDetail={mockMicroCMSBlogDetailView} />);
        expect(screen.getByText("This is a test blog detail description.")).toBeInTheDocument();
    });
    test("コンテンツが表示される", () => {
        render(<BlogDetailView microCMSBlogDetail={mockMicroCMSBlogDetailView} />);
        expect(screen.getByText("This is the content of the test blog detail.")).toBeInTheDocument();
    });
    test("作成日が表示される", () => {
        render(<BlogDetailView microCMSBlogDetail={mockMicroCMSBlogDetailView} />);
        //getbyTextは完全一致しか見つけられない。
        expect(screen.getByText("作成日: 2026-02-13")).toBeInTheDocument();
    });
    test("公開日が表示される", () => {
        render(<BlogDetailView microCMSBlogDetail={mockMicroCMSBlogDetailView} />);
        expect(screen.getByText("公開日: 2026-02-14")).toBeInTheDocument();
    });
    test("サムネイル画像が表示される", () => {
        render(<BlogDetailView microCMSBlogDetail={mockMicroCMSBlogDetailView} />);
        const img = screen.getByRole("img");
        screen.debug();
        expect(img).toHaveAttribute("src", mockMicroCMSBlogDetailView.thumbnail.url);
        expect(img).toHaveAttribute("alt", mockMicroCMSBlogDetailView.title);
    });
});