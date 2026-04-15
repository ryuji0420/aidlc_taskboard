# Application Design（統合）— TaskBoard Mini

## 1. 目的

静的ホスト可能な **Vue 3** 製タスクボードにおいて、**UI コンポーネント**・**Pinia ストア**・**永続化 Repository** の責務と依存を定義する。詳細な不変条件・アルゴリズムは **Functional Design（Construction）** で扱う。

## 2. 技術スタック（設計既定）

| 項目 | 選択 |
|------|------|
| UI | Vue 3（Composition API） |
| 状態 | Pinia |
| 永続化 | `localStorage` + JSON（キーは実装で固定、バージョン接頭辞推奨） |
| D&D / 複数ボード | スコープ外（要件・ストーリーどおり） |

## 3. コンポーネント構成

詳細は [components.md](./components.md)。要約:

- `App` → `BoardView` → `ColumnView` → `CardItem` / `CardCreateForm`

## 4. メソッドとストア API

[component-methods.md](./component-methods.md) を参照。ストアが TB のユースケース（列・カード CRUD、読込・保存）に対応する。

## 5. サービス層

[services.md](./services.md) を参照。**BoardRepository** で永続化を抽象化。

## 6. 依存関係

[component-dependency.md](./component-dependency.md) を参照。UI は常にストア経由、Repository はストアのみ。

## 7. ストーリー対応（トレーサビリティ）

| ストーリー | 主たるコンポーネント / サービス |
|------------|----------------------------------|
| TB-01 | `BoardView`, `ColumnView` |
| TB-02 | `ColumnView`, ストア `addColumn` / `renameColumn` / `removeColumn` |
| TB-03 | `CardCreateForm`, `addCard` |
| TB-04 | `CardItem`, `updateCard` |
| TB-05 | `CardItem`, `deleteCard` |
| TB-06 | `BoardRepository`, `loadFromStorage` / `saveToStorage` |
| TB-07 | `BoardView` 空状態、`CardCreateForm` 導線 |

## 8. 次フェーズ

- **Functional Design**: `BoardSnapshot` スキーマ、列削除時のカード扱い、serialize **round-trip** の PBT 性質。
- **Units Generation**: 実行計画どおり **SKIP**（単一ユニット）。
