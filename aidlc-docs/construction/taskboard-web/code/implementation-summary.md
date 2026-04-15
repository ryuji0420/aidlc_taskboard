# 実装サマリー — taskboard-web（コード）

## 配置

- **アプリコード**: リポジトリルート（`src/`, `package.json`, `vite.config.ts` 等）
- **本ファイル**: `aidlc-docs/` 配下（Markdown のみ）

## 技術

- Vue 3 + TypeScript + Vite 6  
- Pinia 2  
- 永続化: `localStorage` キー `taskboard:v1`（`src/services/repository.ts`）

## 主要モジュール

| パス | 役割 |
|------|------|
| `src/domain/board.ts` | ドメイン（BR・`serialize` / `parse`） |
| `src/domain/board.test.ts` | Vitest + fast-check（round-trip 等） |
| `src/stores/board.ts` | Pinia ストア、保存 debounce 300ms |
| `src/components/*.vue` | Board / Column / Card / Form |

## ストーリー対応

- TB-01〜TB-05: UI + ストア経由でドメイン操作  
- TB-06: 起動時 `loadFromStorage`、変更後 debounce 保存  
- TB-07: 空ボードでも列は 2 本表示（既定スナップショット）

## 検証コマンド

- `npm run test` — ドメイン PBT / 単体  
- `npm run build` — 本番ビルド  
