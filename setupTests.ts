import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
// 各テスト後にクリーンアップ実行
afterEach(() => {
  cleanup();
});
