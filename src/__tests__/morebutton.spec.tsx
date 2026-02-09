import Morebutton from "@/app/components/layout/Morebutton";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("MoreButton", () => {
    test("MoreButtonのテキストが表示される", () => {
        render(<Morebutton href="/individuals" />);
        expect(screen.getByText("もっと見る→")).toBeInTheDocument();

    });
});