# フロントエンド機能設計 — taskboard-web

## コンポーネント階層（再掲・補足）

`App` → `BoardView` → `ColumnView` → `CardItem` / `CardCreateForm`

## 状態（Pinia）

- **単一ストア** `board` が `BoardSnapshot` 相当の状態を保持。
- **ミューテーション**はドメインルールに従い、失敗時は **エラー状態**またはトースト（実装）。

## Props / 主要インタラクション

| コンポーネント | 主な Props | ユーザー操作 → ストア |
|----------------|------------|------------------------|
| `BoardView` | （なし、ストア利用） | 列追加ボタン → `addColumn` |
| `ColumnView` | `columnId` | 列名編集 → `renameColumn`；列削除 → `removeColumn`；カード追加 → `addCard` |
| `CardItem` | `cardId` | 編集確定 → `updateCard`；削除 → `deleteCard` |
| `CardCreateForm` | `columnId` | 送信 → `addCard` |

## バリデーション（UI）

- 空タイトル送信 **不可**（ボタン disabled またはエラー表示）— BR-05 整合。

## 永続化タイミング

- **onMounted**: `loadFromStorage`。
- **ミューテーション後**: `saveToStorage`（**debounce 300ms** 程度を推奨 — 仕様値、実装で調整可）。

## API

バックエンド **なし**。Repository は `localStorage` のみ。
