import {
  IRestaurant,
  Menu,
  MenuEntry,
  IVariant,
  IMenu,
} from '../interfaces/menu'
import { toPairs, groupBy } from 'ramda'

export const unnestMenu = ({ menu, restaurant }: IRestaurant): Menu =>
  menu
    .flatMap(s =>
      s.dishes.flatMap(d =>
        d.variants.map(v => ({
          _id: v._id,
          restaurant,
          section: s.name,
          dishName: d.name,
          dishDescription: d.description,
          dishVariantDescription: v.description,
          dishVariantPrice: v.price,
          dishVariantName: v.name,
        })),
      ),
    )
    .map((entry, index) => ({ index, ...entry }))

const menuEntryToVariant = (entry: MenuEntry): IVariant => ({
  _id: entry._id,
  name: entry.dishVariantName,
  price: entry.dishVariantPrice,
})

const buildDishesGroup = (dishes: MenuEntry[]) =>
  toPairs(groupBy(d => d.dishName, dishes as MenuEntry[])).map(
    ([dishName, entries]) => ({
      name: dishName,
      description: entries[0].dishDescription,
      variants: entries.map(menuEntryToVariant),
    }),
  )

const buildSectionGroup = (menu: Menu): IMenu =>
  toPairs(groupBy<MenuEntry>(e => e.section, menu)).map(
    ([sectionName, entries]) => ({
      name: sectionName,
      dishes: buildDishesGroup(entries),
    }),
  )

export const nestMenu = (menu: Menu): IMenu => buildSectionGroup(menu)
