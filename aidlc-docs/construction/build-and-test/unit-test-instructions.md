# Unit Test Execution — TaskBoard Mini

## コマンド

プロジェクトルートで:

```bash
npm run test
```

ウォッチモード:

```bash
npm run test:watch
```

## 期待結果

- Vitest が **すべて成功**すること（現状: ドメイン `board.test.ts`）。
- テスト対象: `src/domain/board.test.ts`（`fast-check` によるプロパティテスト含む）。
