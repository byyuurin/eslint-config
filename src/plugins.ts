export { default as pluginAntfu } from 'eslint-plugin-antfu'
export { default as pluginJsdoc } from 'eslint-plugin-jsdoc'

// @ts-expect-error missing types
export { default as pluginComments } from 'eslint-plugin-eslint-comments'

// @ts-expect-error missing types
export * as pluginImport from 'eslint-plugin-i'

// @ts-expect-error missing types
export { default as pluginNode } from 'eslint-plugin-n'

// @ts-expect-error missing types
export { default as pluginUnicorn } from 'eslint-plugin-unicorn'

// @ts-expect-error missing types
export { default as pluginSimpleImportSort } from 'eslint-plugin-simple-import-sort'

// @ts-expect-error missing types
export { default as pluginUnusedImports } from 'eslint-plugin-unused-imports'

export const internalPluginRenaming = {
  '@stylistic': 'style',
  '@typescript-eslint': 'ts',
  'import-i': 'import',
  'n': 'node',
  'yml': 'yaml',
} as const
