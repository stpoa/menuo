import { fromPairs, toPairs, pipe, map } from 'ramda'

type Fn = (key: string) => string
export const mapObjectKeys = (transformKey: Fn) =>
  pipe(
    toPairs,
    map(([key, val]) => [transformKey(key), val]),
    fromPairs,
  )
