# Functional Design Plan — taskboard-web

## 前提

- `unit-of-work.md` / `unit-of-work-story-map.md` によりユニット境界確定。
- Application Design で Pinia + Repository + コンポーネント責務を定義済み。
- 追加の多肢質問は、要件・ストーリー・Application Design で主要なビジネスルールが埋まっているため **省略**（曖昧点は下記成果物で **既定ルール** として固定）。

## チェックリスト

- [x] ユニットコンテキスト分析
- [x] `business-logic-model.md`
- [x] `business-rules.md`
- [x] `domain-entities.md`
- [x] `frontend-components.md`（フロントユニット）
- [x] **Testable Properties**（PBT-01）を `business-logic-model.md` に記載
