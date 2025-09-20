export { default as pluginAntfu } from 'eslint-plugin-antfu'
export { default as pluginImportLite } from 'eslint-plugin-import-lite'
export { default as pluginJsdoc } from 'eslint-plugin-jsdoc'
export { default as pluginNode } from 'eslint-plugin-n'
export { default as pluginSimpleImportSort } from 'eslint-plugin-simple-import-sort'
export { default as pluginUnicorn } from 'eslint-plugin-unicorn'
export { default as pluginUnusedImports } from 'eslint-plugin-unused-imports'

// @ts-expect-error missing types
export { default as pluginComments } from 'eslint-plugin-eslint-comments'

export const internalPluginRenaming = {
  '@stylistic': 'style',
  '@typescript-eslint': 'ts',
  'import-i': 'import',
  'n': 'node',
  'yml': 'yaml',
} as const
