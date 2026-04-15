# Code Generation Plan — taskboard-web

## コンテキスト

- **ストーリー**: TB-01〜TB-07（`unit-of-work-story-map.md`）
- **依存**: 外部 API なし。ブラウザ `localStorage` のみ。
- **契約**: `functional-design/` のドメイン・BR・TP に準拠。

## Part 1 — チェックリスト（計画）

- [x] Step 1: ユニット文脈の確認
- [x] Step 2: 詳細計画の作成（本ファイル）
- [x] Step 3: ユーザー承認（Functional Design 承認＋ Code Generation 実行で完了）

## Part 2 — 実装ステップ

- [x] Step 4: Vite + Vue 3 + TS + Pinia プロジェクト骨格（ワークスペースルート）
- [x] Step 5: ドメイン層 `domain/board.ts`（純粋関数・BR・シリアライズ）
- [x] Step 6: ドメイン PBT / 単体テスト（Vitest + fast-check）
- [x] Step 7: `LocalStorageBoardRepository`
- [x] Step 8: Pinia `board` ストア
- [x] Step 9: Vue コンポーネント（Board / Column / Card / Form）
- [x] Step 10: `App.vue` 連結・スタイル最小
- [x] Step 11: `aidlc-docs/construction/taskboard-web/code/implementation-summary.md`
- [x] Step 12: `npm run build` / `npm run test` で検証
