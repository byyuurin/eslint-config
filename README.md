# @byyuurin/eslint-config

## 使用方式

### 安裝開發依賴

```bash
pnpm i -D typescript eslint @byyuurin/eslint-config
```

安裝後 `package.json` 將新增指令

```json
{
  // 檢查
  "lint": "eslint \"**/*.{vue,ts,js}\"",

  // 檢查並修正
  "lint:fix": "eslint \"**/*.{vue,ts,js}\" --fix"
}
```

安裝後將新增以下檔案

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

**.eslintrc.json**
```json
{
  "extends": ["@byyuurin"]
}
```

## 開發備忘

1. 要透過 lerna 發布, 必須將package.json中的 `workspace:^0.0.0` 取代為 `^0.0.0`

```bash
# 安裝依賴至指定 package 中, {name} 必須與 package.json 中的 name 一致
pnpm i ... --filter {name}
```

## 參考資料

1. [使用 pnpm 构建 Monorepo 项目](https://zhuanlan.zhihu.com/p/373935751)
2. [lerna — JS package 管理工具](https://medium.com/lion-f2e/lerna-js-package-%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7-e9ed360d1143)
3. [@antfu/eslint-config](https://github.com/antfu/eslint-config) 專案結構與規則
4. [@fmfe/genesis-lint](https://github.com/fmfe/genesis/tree/master/packages/genesis-lint) 的 `postinstall.js`
