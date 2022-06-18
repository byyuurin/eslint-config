# @byyuurin/eslint-config

[![npm](https://img.shields.io/npm/v/@byyuurin/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@byyuurin/eslint-config)

- 縮排2個空白, 單引號, 無結尾分號
- 透過自動修正來進行程式碼格式化, 不依賴 prettier
- TypeScript, Vue 開箱即用
- 亦適用於 json, yaml, markdown
- 自動排序 import 內容

## 使用方式

### 安裝

```bash
pnpm i -D eslint @byyuurin/eslint-config
```

### `.eslintrc.json` 設定

```json
{
  "extends": ["@byyuurin"]
}
```

可以在 `package.json` 新增 lint 指令主動進行檢查

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
  "lint:fix": "eslint \"src/**/*.{vue,ts,js}\""
}
```

### 若安裝目錄中缺少以下內容時將自動新增檔案

1. .vscode/settings.json (啟用 ESLint 存檔自動格式化功能)
2. .editorconfig (必須搭配 [VSCode 擴充功能](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
3. .eslintrc.json

**新增檔案與內容如下**

**`.vscode/settings.json`**
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

**`.eslintrc.json`**
```json
{
  "extends": ["@byyuurin"]
}
```

## 參考資料

1. [使用 pnpm 构建 Monorepo 项目](https://zhuanlan.zhihu.com/p/373935751)
2. [@antfu/eslint-config](https://github.com/antfu/eslint-config) 專案結構與規則
3. [@fmfe/genesis-lint](https://github.com/fmfe/genesis/tree/master/packages/genesis-lint) 的 `postinstall.js`
