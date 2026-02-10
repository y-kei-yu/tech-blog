import Morebutton from "@/app/components/layout/Morebutton";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

vi.mock("next/link", () => {
    return {
        default: ({ children, href }: { children: React.ReactNode; href: string }) => {
            return <a href={href}>{children}</a>;
        }
    };
});

describe("MoreButton", () => {
    test("MoreButtonのテキストが表示される", () => {
        render(<Morebutton href="/individuals" />);
        expect(screen.getByText("もっと見る→")).toBeInTheDocument();
    });
    test("リンクが正しく設定されている", () => {
        render(<Morebutton href="/individuals" />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/individuals");
    })
});