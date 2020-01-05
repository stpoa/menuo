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
          sectionDescription: s.description,
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
  entry,
})

const buildDishesGroup = (dishes: MenuEntry[]) =>
  toPairs(groupBy(d => d.dishName, dishes as MenuEntry[]))
    .sort(([s1, e1], [s2, e2]) => e1[0].index - e2[0].index)
    .map(([dishName, entries]) => ({
      name: dishName,
      description: entries[0].dishDescription,
      variants: entries
        .sort((e1, e2) => e1.index - e2.index)
        .map(menuEntryToVariant),
    }))

const buildSectionGroup = (menu: Menu): IMenu =>
  toPairs(
    groupBy<MenuEntry>(
      e => e.section,
      menu.sort((e1, e2) => e1.index - e2.index),
    ),
  ).map(([sectionName, entries]) => ({
    name: sectionName,
    description: entries[0].sectionDescription,
    dishes: buildDishesGroup(entries),
  }))

export const nestMenu = (menu: Menu): IMenu => buildSectionGroup(menu)
