// @ts-check
const path = require('path')
const fs = require('fs')

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)

const resolve = (p, base) => path.resolve(base, p)

const createFolder = (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir)

const getProjectDir = () => {
  let completed = false
  let dir = __dirname

  while (!completed) {
    completed = fs.existsSync(resolve('../package.json', dir))
    dir = resolve('../', dir)
    if (completed) {
      const title = ` ${dir} `
      const divider = '='.repeat(title.length)
      log(['', divider, '%s', divider].join('\n'), title)
    }
  }

  return dir
}

/**
 * @typedef CustomFile
 * @type {{ path: string, body: string }}
 */

/**
 * @param {CustomFile[]} files
 */
const createFiles = (files = []) => {
  const dir = getProjectDir()

  return files.map(({ path, body }) => {
    const parents = path.split('/').slice(0, -1)

    if (parents.length) {
      const parentPath = []

      parents.forEach((p) => {
        parentPath.push(p)
        const folderDir = resolve(parentPath.join('/'), dir)
        createFolder(folderDir)
      })
    }

    return {
      path: resolve(path, dir),
      body,
    }
  }).forEach(({ path, body }) => {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, body)
      log(`- [Created] ${path}`)
    }
    else {
      log(`- [Existed] ${path}`)
    }
  })
}

const createESLintConfig = (name = '') => {
  let needWrite = false
  const dir = getProjectDir()
  const filePath = resolve('package.json', dir)
  const configPaths = [
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.json',
  ]
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  const config = { extends: name }
  const rawExtends = (json.eslintConfig && json.eslintConfig.extends) || ''

  if (configPaths.some((p) => fs.existsSync(resolve(p, dir)))) {
    log('- [Existed] .eslintrc.*')
    return
  }

  if (!json.eslintConfig) {
    json.eslintConfig = config
    needWrite = true
    log('- [Appended] eslintConfig')
  }

  if (!needWrite && typeof rawExtends === 'string' && rawExtends !== config.extends) {
    json.eslintConfig.extends = name
    needWrite = true
    log('- [Replaced] eslintConfig.extends')
  }

  if (needWrite) {
    fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`, 'utf-8')
    return
  }

  log('- [Existed] eslintConfig')
}

module.exports = { createFiles, createESLintConfig }
