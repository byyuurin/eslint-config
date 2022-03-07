/* eslint-disable */
const path = require('path')
const fs = require('fs')
const package = require('./package.json')
const vscodeConfig = require('./.vscode/settings.json')
const eslintConfig = require('./.eslintrc.json')
/* eslint-enable  */

let baseDir = path.resolve(__dirname)
let isLoopContinue = true

const log = (message) => console.log(message)
const resolve = (file, base = baseDir) => path.resolve(base, file)

log(`\n${'='.repeat(20)}\n${package.name}\n${'='.repeat(20)}`)

// 找出目前專案路徑
while (isLoopContinue) {
  const root = resolve('./')
  const isProjectRoot = fs.existsSync(resolve('../package.json'))
  baseDir = resolve('../')
  isLoopContinue = baseDir !== root && !isProjectRoot
}

const packageFile = resolve('package.json')

const mergePackage = () => {
  if (!fs.existsSync(packageFile)) return

  let data = null

  try {
    data = JSON.parse(fs.readFileSync(packageFile, 'utf-8'))
  } catch (e) {
    log('Merge package.json fail.')
  }

  if (!data) return

  const template = {
    // 增加 script
    scripts: {
      ...(data.scripts || {}),
      lint: 'eslint "**/*.{vue,ts,js}"',
      'lint:fix': 'eslint "**/*.{vue,ts,js}" --fix'
    }
  }

  Object.assign(data, template)

  fs.writeFileSync(packageFile, JSON.stringify(data, null, 2) + '\n')

  log('Merge package.json done.')
}

const createFile = ({ path, text, beforeCreate }) => {
  if (fs.existsSync(path)) return

  if (typeof beforeCreate === 'function') {
    beforeCreate({ path, text, beforeCreate })
  }

  fs.writeFileSync(path, text)

  log(`Create file: ${path}.`)
}

const install = () => {
  mergePackage()

  const files = [
    {
      path: resolve('.vscode/settings.json'),
      beforeCreate: ({ path }) => {
        const dir = resolve('../', path)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir)
      },
      text: JSON.stringify(vscodeConfig, null, 2)
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
      text: JSON.stringify(eslintConfig, null, 2)
    },
    {
      path: resolve('.eslintignore'),
      text: `node_modules
dist
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

install()
