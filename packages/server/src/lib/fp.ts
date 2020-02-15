import { pipe, map } from 'ramda'

type Fn = (key: string) => string
export const mapObjectKeys = (transformKey: Fn) =>
  pipe(
    Object.entries,
    map(([key, val]) => [transformKey(key), val]),
    Object.fromEntries,
  )
