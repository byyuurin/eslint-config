// @ts-check
const { log, createFiles, createESLintConfig } = require('./utils')

const namespace = '@byyuurin'
const title = `${namespace}/eslint-config`
const divider = `+-${'-'.repeat(title.length)}-+`
log([divider, '%s', divider].join('\n'), `| ${title} |`)

createFiles([
  {
    path: '.vscode/settings.json',
    body: `${JSON.stringify({
      'prettier.enable': false,
      'editor.formatOnSave': false,
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true,
        'source.organizeImports': false,
      },
      'eslint.validate': ['yml', 'yaml', 'json', 'jsonc'],
    }, null, 2)}\n`,
  },
  {
    path: '.editorconfig',
    body: [
      '# http://editorconfig.org',
      'root = true',
      '',
      '[*]',
      'indent_style = space',
      'indent_size = 2',
      'end_of_line = lf',
      'charset = utf-8',
      'trim_trailing_whitespace = true',
      'insert_final_newline = true',
      '',
    ].join('\n'),
  },
])

createESLintConfig(namespace)
