# @byyuurin/eslint-config

## 使用方式

### 安裝開發依賴

```bash
pnpm i -D typescript eslint @byyuurin/eslint-config
```

可以在 `package.json` 新增 lint 指令主動進行檢查

```json
{
  "scripts": {
    // 檢查
    "lint-all": "eslint .",

    // 檢查並嘗試修正錯誤
    "lint-all-fix": "eslint . --fix",

    // 指定範圍進行檢查
    "lint-fix": "eslint \"src/**/*.{vue,ts,js}\""
  }
}
```

**安裝後將新增以下檔案**

1. .vscode/settings.json
2. .editorconfig
3. .eslintrc.json
4. .eslintignore
5. .gitignore

若檔案已存在時可參考以下檔案內容進行調整

**.vscode/settings.json**
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

**.editorconfig**
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

**.eslintrc.json**
```json
{
  "extends": ["@byyuurin"]
}
```

**.eslintignore**
```
dist
public
```

**.gitignore**

[參考 create-vite/template-vue-ts](https://github.com/vitejs/vite/blob/main/packages/create-vite/template-vue-ts/_gitignore)

## 開發備忘

```bash
# 安裝依賴至指定 package 中, {name} 必須與 package.json 中的 name 一致
pnpm i ... --filter {name}
```

## 參考資料

1. [使用 pnpm 构建 Monorepo 项目](https://zhuanlan.zhihu.com/p/373935751)
2. ~~[lerna — JS package 管理工具](https://medium.com/lion-f2e/lerna-js-package-%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7-e9ed360d1143)~~ 改用 `bumpp` + `pnpm publish`
3. [@antfu/eslint-config](https://github.com/antfu/eslint-config) 專案結構與規則
4. [@fmfe/genesis-lint](https://github.com/fmfe/genesis/tree/master/packages/genesis-lint) 的 `postinstall.js`
