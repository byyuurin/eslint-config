import type { Awaitable, TypedFlatConfigItem } from './types'

type FlatConfigProvider<T> = T extends ((...args: infer P) => Awaitable<TypedFlatConfigItem[]>)
  ? P extends never[]
    ? () => Awaitable<TypedFlatConfigItem[]>
    : (options?: P[0]) => Awaitable<TypedFlatConfigItem[]>
  : never

export function defineFlatConfigProvider<T extends (() => Awaitable<TypedFlatConfigItem[]>)>(provider: T) {
  return provider as unknown as FlatConfigProvider<T>
}
