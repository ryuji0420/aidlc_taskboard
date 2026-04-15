# aidlc_taskboard

AI-DLC（AI-Driven Development Life Cycle）で **TaskBoard Mini** などを進めるためのワークスペースです。

## 使い方

1. **Cursor でこのフォルダをワークスペースのルートとして開く**（親の `specification_driven_tools` だけ開くとプロジェクトルールが効きません）。
2. チャットで次のように依頼するとワークフローが始まります。  
   `Using AI-DLC, （やりたいこと）`
3. 仕様・ログ・状態は **`aidlc-docs/`** のみに出力します。アプリコードは **このフォルダの直下**（`aidlc-docs/` 外）に置きます。

## セットアップの根拠

- ルール本体: リポジトリ内の `aidlc_asset/aidlc-rules/`（`core-workflow.md` → `.cursor/rules/ai-dlc-workflow.mdc`、`aws-aidlc-rule-details` → `.aidlc-rule-details/`）
- 手順の説明: `aidlc_docs/AI-DLC-Cursorセットアップマニュアル.md`

## パスについて

`aidlc-docs/aidlc-state.md` の **Workspace Root** は、マシンやフォルダ移動後は **実際に開いている本ディレクトリの絶対パス**に合わせて更新してください。

## 参考（リポジトリ共通）

- 比較実験の文脈: `docs/session-context.md`
- 題材の例: `docs/sample-b-taskboard-mini-spec.md`（読み込ませず照合用としても可）
