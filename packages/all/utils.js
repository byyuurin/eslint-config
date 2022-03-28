/* eslint-disable */
const path = require('path')
const fs = require('fs')
/* eslint-enable  */

const log = (message) => console.log(message) // eslint-disable-line no-console
const pathResolve = (file, base) => path.resolve(base, file)

const createFile = ({ path, text, beforeCreate }) => {
  if (fs.existsSync(path)) return

  if (typeof beforeCreate === 'function')
    beforeCreate({ path, text })

  fs.writeFileSync(path, text)

  log(`Create file: ${path}`)
}

const install = (base, name) => {
  let baseDir = base
  let isLoopContinue = true
  const resolve = (path) => pathResolve(path, baseDir)

  // 找出目前專案路徑
  while (isLoopContinue) {
    const root = resolve('./')
    const isProjectRoot = fs.existsSync(resolve('../package.json'))
    baseDir = resolve('../')
    isLoopContinue = baseDir !== root && !isProjectRoot
  }

  const files = [
    {
      path: resolve('.vscode/settings.json'),
      beforeCreate: ({ path }) => {
        const dir = pathResolve('../', path)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir)
      },
      text: `{
  "prettier.enable": false,
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  }
}
`
    },
    {
      path: resolve('.editorconfig'),
      text: `# http://editorconfig.org
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
`
    },
    {
      path: resolve('.eslintrc.json'),
      text: `{
  "extends": "${name}"
}
`
    },
    {
      path: resolve('.eslintignore'),
      text: `dist
public
`
    },
    {
      path: resolve('.gitignore'),
      text: `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`
    }
  ]

  files.forEach((file) => createFile(file))
}

module.exports = { install }
