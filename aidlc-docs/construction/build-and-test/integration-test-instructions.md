# Integration Test Execution — TaskBoard Mini

## 現状

- バックエンドがないため、**API 結合テストは対象外**。
- UI の結合テスト（Playwright / Cypress）は未導入。必要なら別タスクでテンプレート追加。

## 手動スモーク

1. `npm run dev` で起動。
2. 列が 2 本表示されること。
3. カード追加・編集・削除、列名変更、列削除（3 本以上で）、リロード後も状態が残ること。
