import { describe } from "node:test";
import { test, vi } from "vitest";


vi.mock("next/link", () => {
    return {
        default: ({ children, href }: { children: React.ReactNode; href: string }) => {
            return <a href={href}>{children}</a>;
        }
    };
});
describe("Pagination", () => {
    test("初期状態", () => {

    })
});