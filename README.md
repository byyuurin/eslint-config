# @byyuurin/eslint-config

> ESLint config for TypeScript project

1. 參考 [此文章](https://zhuanlan.zhihu.com/p/373935751) 並實作
2. 參考 [此專案](https://github.com/antfu/eslint-config) 結構
3. 搭配 [此模板](https://github.com/byyuurin/vscode-blueprint-templates) 產生基本設定檔

## 使用方式

### 安裝開發依賴

```bash
pnpm i -D typescript eslint @byyuurin/eslint-config
```

### 設定 `.eslintrc`

```json
{
  "extends": ["@byyuurin"]
}
```

### 設定 `.eslintignore`

例:

```
dist
public
```

### 在 `package.json` 新增執行指令

例:

```json
{
  "scripts": {
    // 檢查
    "lint": "eslint \"**/*.{vue,ts,js}\"",

    // 檢查並修正
    "lint:fix": "eslint \"**/*.{vue,ts,js}\" --fix"
  }
}
```

### 在 `.vscode/settings.json` 新增以下設定

```json
{
  // 不管是否有安裝 prettier 擴充功能都建議加上此設定以避免規則衝突
  "prettier.enable": false,

  // 啟用 Visual Studio Code 自動修正功能
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
