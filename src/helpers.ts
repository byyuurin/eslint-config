import type { Awaitable, FlatConfigItem } from './types'

type FlatConfigProvider<T> = T extends ((...args: infer P) => Awaitable<FlatConfigItem[]>)
  ? P extends never[]
    ? () => Awaitable<FlatConfigItem[]>
    : (options?: P[0]) => Awaitable<FlatConfigItem[]>
  : never

export function defineFlatConfigProvider<T extends (() => Awaitable<FlatConfigItem[]>)>(provider: T) {
  return provider as unknown as FlatConfigProvider<T>
}
