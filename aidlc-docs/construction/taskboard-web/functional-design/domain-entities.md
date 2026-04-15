# ドメインエンティティ — taskboard-web

## 識別子

- **ColumnId**, **CardId**: 非空文字列（実装は UUID / nanoid 等。ドメイン上は **一意性** のみ規定）。

## `Column`

| フィールド | 型 | 制約 |
|------------|-----|------|
| `id` | ColumnId | ボード内で一意 |
| `title` | string | トリム後 1〜120 文字（上限は実装定数） |
| `order` | number | 0 以上の整数、ボード内で **一意**（表示順） |

## `Card`

| フィールド | 型 | 制約 |
|------------|-----|------|
| `id` | CardId | ボード内で一意 |
| `columnId` | ColumnId | **存在する列** を参照 |
| `title` | string | トリム後 1〜500 文字 |
| `body` | string \| null | 任意。長さ上限は実装定数 |

## `BoardSnapshot`（永続化・メモリ共有）

アプリが **単一の整合したスナップショット** として保持する構造。

| フィールド | 型 | 制約 |
|------------|-----|------|
| `schemaVersion` | string | 例: `"1"`。読込時に未知バージョンは **マイグレーション or 拒否**（Functional のフォールバック方針）。 |
| `columns` | `Column[]` | 少なくとも **2 要素**（要件「複数列」） |
| `cards` | `Card[]` | 各 `columnId` が `columns` の id に存在 |

### 整合性（不変条件）

1. `columns` の `order` は `0 .. columns.length-1` の **順列**。  
2. 任意の `card.columnId` は `columns` の id 集合に含まれる。  
3. `columns` と `cards` の id に **重複なし**（列間・カード間それぞれ）。
