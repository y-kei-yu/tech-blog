import Pagination from "@/app/components/layout/Pagination";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, test, vi } from "vitest";


vi.mock("next/link", () => {
    return {
        default: ({ children, href }: { children: ReactNode; href: string }) => {
            return <a href={href}>{children}</a>;
        },
    };
});
describe("Pagination", () => {
    test("1ページ目では前へがdisabledになり、次ページはLinkになる", () => {
        render(<Pagination currentPage={1} hasNextPage={true} />);
        const prev = screen.getByRole("button", { name: "前へ" });
        expect(prev).toHaveClass("btn-disabled");
        const link = screen.getByRole("link", { name: "次へ" });
        expect(link).toHaveAttribute("href", "/individuals?page=2");
    })
    test("2ページ目では前へがLinkになり、次ページはdisabledになる", () => {
        render(<Pagination currentPage={2} hasNextPage={false} />);
        const prev = screen.getByRole("link", { name: "前へ" });
        expect(prev).toHaveAttribute("href", "/individuals?page=1");
        const link = screen.getByRole("button", { name: "次へ" });
        expect(link).toHaveClass("btn-disabled");
    })
    test("3ページ目では前へと次へがLinkになる", () => {
        render(<Pagination currentPage={3} hasNextPage={true} />);
        const prev = screen.getByRole("link", { name: "前へ" });
        expect(prev).toHaveAttribute("href", "/individuals?page=2");
        const link = screen.getByRole("link", { name: "次へ" });
        expect(link).toHaveAttribute("href", "/individuals?page=4");
    })
});