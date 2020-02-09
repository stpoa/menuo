import { groupBy } from 'ramda'
import { BasketEntry } from './MenuPage'
import { MenuEntry } from '@menuo/shared'

export const getOrderedEntries = (menu: MenuEntry[], basket: BasketEntry[]) => {
  const byEntry = groupBy<BasketEntry>(
    entry => `${entry.dish} | ${entry.variant}`,
  )

  const compare = (b: BasketEntry) => (e: MenuEntry) =>
    e.dishName === b.dish &&
    (e.dishVariantName === b.variant || (e.dishVariantName || '') === b.variant)

  return Object.values(byEntry(basket))
    .map(entries => ({ entry: entries[0], count: entries.length }))
    .map(({ entry, count }) => {
      const menuEntry = menu.find(compare(entry))!
      return [menuEntry, count] as [MenuEntry, number]
    })
}
