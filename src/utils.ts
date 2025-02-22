/* eslint-disable no-constant-binary-expression */

// ref: https://github.com/antfu/eslint-config/blob/main/src/utils.ts

import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import type { Awaitable, TypedFlatConfigItem } from './types'

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
): Promise<TypedFlatConfigItem[]> {
  const resolved = await Promise.all(configs)

  return resolved.flat()
}

export function renameRules(
  rules: Record<string, any>,
  map: Record<string, string>,
) {
  return Object.fromEntries(
    Object.entries(rules)
      .map(([key, value]) => {
        for (const [from, to] of Object.entries(map)) {
          if (key.startsWith(from))
            return [to + key.slice(from.length), value]
        }

        return [key, value]
      }),
  )
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export function toUniqueStringArray(items: string[]) {
  return Array.from(new Set(items))
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m

  return (resolved as any).default || resolved
}

export async function ensurePackages(packages: string[]) {
  if (process.env.CI || process.stdout.isTTY === false)
    return

  const nonExistingPackages = packages.filter((i) => !isPackageExists(i))

  if (nonExistingPackages.length === 0)
    return

  const { default: prompts } = await import('prompts')

  const { result } = await prompts([
    {
      message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
      name: 'result',
      type: 'confirm',
    },
  ])

  if (result)
    await import('@antfu/install-pkg').then((i) => i.installPackage(nonExistingPackages, { dev: true }))
}

export function isInEditorEnv(): boolean {
  if (process.env.CI)
    return false

  if (isInGitHooksOrLintStaged())
    return false

  return !!(false
    || process.env.VSCODE_PID
    || process.env.VSCODE_CWD
    || process.env.JETBRAINS_IDE
    || process.env.VIM
    || process.env.NVIM
  )
}

export function isInGitHooksOrLintStaged(): boolean {
  return !!(false
    || process.env.GIT_PARAMS
    || process.env.VSCODE_GIT_COMMAND
    || process.env.npm_lifecycle_script?.startsWith('lint-staged')
  )
}
