# サービス層 — TaskBoard Mini

## 方針

- **単一ページ SPA** のため、バックエンド API はない。
- **オーケストレーション**は **Pinia ストア**が担う（ユースケースに相当）。
- **永続化**は **Repository パターン**で抽象化し、**localStorage** 実装を差し替え可能にする（テストでモックしやすくする）。

---

## S1 — `BoardRepository`（インターフェース）

| 項目 | 内容 |
|------|------|
| **責務** | ボード状態の **load / save** のみ（ビジネスルールはストア） |
| **入力** | `save` はスナップショット（JSON 互換オブジェクト） |
| **出力** | `load` はパース済みオブジェクトまたは `null`（初回） |

---

## S2 — `LocalStorageBoardRepository`

| 項目 | 内容 |
|------|------|
| **責務** | 固定キー（例: `taskboard:v1`）に JSON 文字列を読み書き |
| **エラー** | `QuotaExceeded`、JSON 破損時は Functional Design でフォールバック方針を定義 |

---

## S3 — `BoardStore`（Pinia）

| 項目 | 内容 |
|------|------|
| **責務** | TB-01〜TB-06 に対応する **単一のドメイン状態**；Repository との同期 |
| **連携** | 変更後に `save()` を呼ぶ（同期または短い debounce） |

---

## テストとの関係

- Repository の **round-trip**（load ∘ save）は **PBT 対象**（要件 4.1、TB-06）。
- ストアの純粋な **reducer 的** 部分が分離できるなら、そこも PBT の候補（Functional Design で特定）。
