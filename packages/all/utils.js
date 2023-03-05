// @ts-check
const path = require('node:path')
const fs = require('node:fs')

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

    if (parents.length > 0) {
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
    if (fs.existsSync(path)) {
      log(`- [Existed] ${path}`)
    }
    else {
      fs.writeFileSync(path, body)
      log(`- [Created] ${path}`)
    }
  })
}

const createESLintConfig = (name = '') => {
  const dir = getProjectDir()
  const filePath = resolve('package.json', dir)
  const configPaths = [
    '.eslintrc',
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.json',
  ]
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const config = { extends: name }
  const rawExtends = (json.eslintConfig && json.eslintConfig.extends) || ''
  let localConfigName = ''

  configPaths.some((p) => {
    const isFileExists = fs.existsSync(resolve(p, dir))
    if (isFileExists) localConfigName = p
    return isFileExists
  })

  if (localConfigName) {
    log('- [Existed] %s', localConfigName)
    return
  }

  /** @type {'Append' | 'Replace' | ''} */
  let writeMode = ''

  if (!json.eslintConfig) {
    json.eslintConfig = config
    writeMode = 'Append'
    log('- [Append] eslintConfig')
  }

  if (!writeMode && typeof rawExtends === 'string' && rawExtends !== config.extends) {
    json.eslintConfig.extends = [rawExtends, name].filter(Boolean)
    writeMode = 'Replace'
    log('- [Replace] eslintConfig.extends')
  }

  if (writeMode) {
    try {
      fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`, 'utf8')
    }
    catch {
      if (writeMode === 'Append')
        fs.writeFileSync(resolve('.eslintrc.json', dir), `${JSON.stringify(config, null, 2)}\n`)
    }
    return
  }

  log('- [Existed] eslintConfig')
}

module.exports = { log, createFiles, createESLintConfig }
