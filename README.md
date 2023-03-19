# @byyuurin/eslint-config

[![npm](https://img.shields.io/npm/v/@byyuurin/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@byyuurin/eslint-config)

- 單引號優先，不用結尾分號
- 透過自動修正來達成格式化（旨在獨立使用，無需Prettier）
- 自動檢查 JavaScript、TypeScript、Vue、json、yaml 與 markdown
- 排序 import 內容，逗號懸空(comma-dangle)
- **風格原則**: 閱讀輕鬆，穩定差異

## 使用方式

### 安裝

```bash
pnpm i -D eslint @byyuurin/eslint-config
```

安裝後將嘗試更新 `package.json` 內容，由於已預先設定排除條件，通常不需要 `.eslintignore`


### 套用規則

可以選擇在 `package.json` 中新增

```json
{
  "eslintConfig": {
    "extends": "@byyuurin"
  }
}
```

或是新增一個[設定檔](https://eslint.org/docs/latest/user-guide/configuring/configuration-files)，
例 `.eslintrc.json`

```json
{
  "extends": ["@byyuurin"]
}
```

### 啟用 VS Code 自動修正

安裝 [VS Code ESLint 擴充功能](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 並新增 `.vscode/settings.json`

```json
{
  // 不管是否有安裝 prettier 擴充功能都建議加上此設定以避免規則衝突
  "prettier.enable": false,
  // 關閉存檔自動格式化
  "editor.formatOnSave": false,
  // 啟用存檔自動修正
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 設定額外由 ESLint 檢查的檔案類型
  "eslint.validate": ["yml", "yaml", "json", "jsonc"]
}
```

### 新增 lint 指令主動進行檢查 (選擇性)

```json
{
  // 檢查
  "lint": "eslint .",
  // 檢查並修正錯誤
  "lint:fix": "eslint . --fix"
}
```

```json
{
  // 指定範圍進行檢查
  "lint": "eslint \"src/**/*.{vue,ts,js}\"",
  // 指定範圍進行檢查並修正錯誤
  "lint:fix": "eslint \"src/**/*.{vue,ts,js}\" --fix"
}
```

### 若安裝目錄中缺少以下內容時將自動新增檔案

1. [.vscode/settings.json](#啟用-VS-Code-自動修正) (啟用存檔自動格式化)
2. [.editorconfig](./.editorconfig) (需要搭配安裝 [VSCode 擴充功能](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
3. [.eslintrc.json](#套用規則) (僅 package.json 無法加入 eslintConfig 時產生)

## 參考資料

1. [使用 pnpm 构建 Monorepo 项目](https://zhuanlan.zhihu.com/p/373935751)
2. [@antfu/eslint-config](https://github.com/antfu/eslint-config) 專案結構與規則
3. [@fmfe/genesis-lint](https://github.com/fmfe/genesis/tree/master/packages/genesis-lint) 的 `postinstall.js`
