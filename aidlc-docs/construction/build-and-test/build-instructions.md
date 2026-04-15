# Build Instructions — TaskBoard Mini

## Prerequisites

- **Node.js**: 20 系以上推奨（開発時は 22 でも可）
- **パッケージマネージャ**: npm（`package-lock.json` 同梱想定）

## Build Steps

### 1. 依存関係のインストール

```bash
cd /Users/user/Desktop/workspace/ai_labo/specification_driven_tools/aidlc_taskboard
npm install
```

### 2. 本番ビルド

```bash
npm run build
```

### 3. 成果物

- 出力先: `dist/`
- 静的ホストに `dist/` の内容を配置すればよい（環境変数不要）

## トラブルシューティング

- **`vue-tsc` エラー**: `npm install` を再実行し、TypeScript / `vue-tsc` のバージョンを確認する。
- **ビルドは成功するが画面が真っ白**: ブラウザコンソールで `localStorage` やパス（`base`）を確認する。
