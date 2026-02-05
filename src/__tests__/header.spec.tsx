import "@testing-library/jest-dom/vitest";
import { expect, test } from 'vitest'
import { render, screen, } from '@testing-library/react'
import Header from "@/app/components/layout/Header";


test('タイトルが表示できること', async () => {
    render(<Header />);
    const headerTitle = await screen.findByTestId("header-title");
    expect(headerTitle).toHaveTextContent("My Tech Blog");
})