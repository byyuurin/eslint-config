# @byyuurin/eslint-config

[![npm](https://img.shields.io/npm/v/@byyuurin/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@byyuurin/eslint-config)

- 縮排2個空白, 單引號, 無結尾分號
- 透過自動修正來達成程式碼格式化, 可獨立使用不依賴 prettier
- 自動修正 JavaScript, TypeScript, Vue, json, yaml, markdown
- 排序導入(import)內容，使用拖尾逗號(comma-dangle)讓差異記錄更清晰

## 使用方式

### 安裝

```bash
pnpm i -D eslint @byyuurin/eslint-config
```

安裝後將嘗試更新 `package.json` 內容，由於已預先設定排除條件，通常不需要 `.eslintignore`


### 套用規則

```json
// package.json
{
  // ...
  "eslintConfig": {
    "extends": "@byyuurin"
  }
}
```

```json
// .eslintrc.json
{
  "extends": ["@byyuurin"]
}
```

### 設定 `.vscode/settings.json`

```json
{
  // 不管是否有安裝 prettier 擴充功能都建議加上此設定以避免規則衝突
  "prettier.enable": false,
  // 啟用存檔自動修正
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 設定由 ESLint 驗證的語言
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "json5",
    "yml",
    "yaml"
  ]
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

1. .vscode/settings.json (啟用 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 存檔自動格式化功能)
2. .editorconfig (需要搭配安裝 [VSCode 擴充功能](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))

**新增檔案與內容如下**

**`.vscode/settings.json`**
```json
{
  "prettier.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

**`.editorconfig`**
```bash
# http://editorconfig.org
root = true

[*]
# 縮排使用空白
indent_style = space
# 縮排大小
indent_size = 2
# 換行字元
end_of_line = lf
# 字元編碼
charset = utf-8
# 是否刪除句尾空格
trim_trailing_whitespace = true
# 是否在文件最後插入空白行
insert_final_newline = true
```

## 參考資料

1. [使用 pnpm 构建 Monorepo 项目](https://zhuanlan.zhihu.com/p/373935751)
2. [@antfu/eslint-config](https://github.com/antfu/eslint-config) 專案結構與規則
3. [@fmfe/genesis-lint](https://github.com/fmfe/genesis/tree/master/packages/genesis-lint) 的 `postinstall.js`
