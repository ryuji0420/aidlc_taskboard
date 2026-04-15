# コンポーネント／ストア メソッド — TaskBoard Mini

詳細な不変条件・PBT 対象は **Functional Design** で拡張する。ここでは **シグニチャと意図** のみ示す。

---

## Pinia Store — `useBoardStore()`（名前は実装で確定可）

| メソッド | 入力 | 出力 / 副作用 | 目的 |
|----------|------|----------------|------|
| `loadFromStorage()` | なし | `Promise<void>` | Repository から読み込み、状態を置換 |
| `saveToStorage()` | なし | `Promise<void>` | 現在状態を Repository へ保存 |
| `addColumn(title?)` | `title?: string` | `void` | 新規列 ID 生成・追加 |
| `renameColumn(columnId, title)` | `columnId`, `title` | `void` | 列名更新 |
| `removeColumn(columnId)` | `columnId` | `void` | 列削除（カードの扱いは Functional Design で定義） |
| `addCard(columnId, payload)` | `columnId`, `{ title: string, body?: string }` | `void` | 新規カードを列に追加 |
| `updateCard(cardId, payload)` | `cardId`, `partial` | `void` | カード更新 |
| `deleteCard(cardId)` | `cardId` | `void` | カード削除 |

---

## `BoardRepository`（サービス — コンポーネントからはストア経由で呼ぶ）

| メソッド | 入力 | 出力 | 目的 |
|----------|------|------|------|
| `load()` | なし | `Promise<BoardSnapshot \| null>` | ストレージから JSON 読込 |
| `save(snapshot)` | `BoardSnapshot` | `Promise<void>` | JSON 書込 |

`BoardSnapshot` はシリアライズ可能なプレーンオブジェクト（Functional Design でスキーマ確定）。

---

## UI ハンドラ（コンポーネント）

| 箇所 | イベント | 呼び出し |
|------|----------|----------|
| `ColumnView` | 列名編集確定 | `renameColumn` |
| `ColumnView` | 列削除 | `removeColumn` |
| `ColumnView` / フォーム | カード追加確定 | `addCard` |
| `CardItem` | 編集確定 | `updateCard` |
| `CardItem` | 削除 | `deleteCard` |
| `App` | `onMounted` | `loadFromStorage` |
| ストア（mutation 後） | debounce 可 | `saveToStorage` |
