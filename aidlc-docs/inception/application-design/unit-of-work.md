# Unit of Work — taskboard-web

## 背景

**Units Generation** は実行計画どおり **SKIP** としたが、Construction の Functional Design 前提を満たすため、単一ユニットとして境界を明示する。

## ユニット識別子

- **unit-name**: `taskboard-web`
- **種類**: クライアントのみ（Vue SPA、静的ホスト）

## 境界

| 含む | 含まない |
|------|----------|
| ボード UI、Pinia 状態、localStorage Repository、JSON シリアライズ | バックエンド API、認証、複数ボード、D&D |
| 単一オリジン・単一 `origin` のブラウザストレージ | サーバー永続化 |

## 成果物の置き場（ドキュメント）

- **Functional Design**: `aidlc-docs/construction/taskboard-web/functional-design/`
- **コード（将来）**: リポジトリルート（`aidlc-docs` 外）

## 依存

- 外部サービスなし。ブラウザ API のみ。
