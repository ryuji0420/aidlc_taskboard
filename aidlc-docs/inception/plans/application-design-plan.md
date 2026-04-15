# Application Design Plan — TaskBoard Mini

## 計画メタ

- **前提**: `requirements.md`・`stories.md`（TB-01〜TB-07）で Vue・ブラウザ永続化・列/カード境界が明示済み。追加の多肢質問は **不要** と判断（曖昧さは下記「設計既定」で解消）。
- **設計既定（MVP）**: **Vue 3 + Composition API**、状態は **Pinia**、永続化は **localStorage** に **JSON スナップショット**（要件の「localStorage または IndexedDB」のうち、まず **localStorage** を採用。将来 IndexedDB へ移行する場合は Repository のみ差し替え）。

## 実行チェックリスト

- [x] コンテキスト分析（要件・ストーリー）
- [x] `components.md` 作成
- [x] `component-methods.md` 作成
- [x] `services.md` 作成
- [x] `component-dependency.md` 作成
- [x] `application-design.md`（統合）作成
- [x] 整合性レビュー（依存関係・用語）

## 必須成果物（ルール Step 3）

- [x] `aidlc-docs/inception/application-design/components.md`
- [x] `aidlc-docs/inception/application-design/component-methods.md`
- [x] `aidlc-docs/inception/application-design/services.md`
- [x] `aidlc-docs/inception/application-design/component-dependency.md`
- [x] `aidlc-docs/inception/application-design/application-design.md`

## 質問（省略の根拠）

ルール上のカテゴリは要件でカバー済みのため、別紙 `requirement-verification-questions.md` およびストーリー計画に委ね、本計画では **[Answer]: なし（省略）** とする。
