# @byyuurin/eslint-config

1. 參考[此文章](https://zhuanlan.zhihu.com/p/373935751)並實作
2. 參考[此專案](https://github.com/antfu/eslint-config)結構

## 使用方式

### 安裝

```ssh
pnpm i -D eslint git+https://github.com/byyuurin/eslint-config
```

### 設定 `.eslintrc`

```json
{
  "extends": ["@byyuurin"]
}
```

### 設定 `.eslintignore`

```
dist
public
```

### 在 package.json 新增執行指令

例:

```json
{
  "scripts": {
    "lint": "eslint \"**/*.{vue,ts,js}\""
  }
}
```

### 啟用 Visual Studio Code 自動修正功能

```json
{
  "prettier.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
