# @byyuurin/eslint-config

> ESLint config for TypeScript project
1. 參考 [lerna — JS package 管理工具](https://medium.com/lion-f2e/lerna-js-package-%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7-e9ed360d1143)
1. 參考 [使用 pnpm 构建 Monorepo 项目](https://zhuanlan.zhihu.com/p/373935751)
2. 參考 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 結構
3. 可搭配 [模板](https://github.com/byyuurin/vscode-blueprint-templates) 產生基本設定檔

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

### 開發備忘

1. 要透過 lerna 發布, 必須將package.json中的 `^0.0.0` 取代為 `^0.0.0`

```bash
# 安裝依賴至指定 package 中, {name} 必須與 package.json 中的 name 一致
pnpm i ... --filter {name}
```
