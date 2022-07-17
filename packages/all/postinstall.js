// @ts-check
const { createFiles, createESLintConfig } = require('./utils')

createFiles([
  {
    path: '.vscode/settings.json',
    body: `${JSON.stringify({
      'prettier.enable': false,
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true,
      },
      'eslint.validate': [
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact',
        'vue',
        'html',
        'markdown',
        'json',
        'jsonc',
        'json5',
        'yml',
        'yaml',
      ],
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

createESLintConfig('@byyuurin')
