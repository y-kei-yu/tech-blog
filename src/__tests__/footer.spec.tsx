import Footer from "@/app/components/layout/Footer";
import "@testing-library/jest-dom/vitest";
import { expect, test } from 'vitest'
import { render, screen, } from '@testing-library/react'

test("フッターが表示されること", async () => {
    render(<Footer />);
    const footerText = await screen.findByTestId("footer-text");
    expect(footerText).toHaveTextContent("Built with Next.js & microCMS");
})