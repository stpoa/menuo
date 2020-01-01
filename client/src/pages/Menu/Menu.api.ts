import { get } from '../../api'
import { toPairs, groupBy } from 'ramda'

export const getRestaurant = (restaurantId: string) =>
  get<Menu>(`/restaurants/${restaurantId}`)

export type Menu = MenuEntry[]

export interface MenuEntry {
  index: number
  restaurant: string
  section: string
  dishName: string
  dishDescription?: string
  dishVariantName?: string
  dishVariantDescription?: string
  dishVariantPrice: number
}

export interface IRestaurant {
  restaurant: string
  menu: ISection[]
}

export type IMenu = ISection[]

export interface ISection {
  name: string
  dishes: IDish[]
}

export interface IDish {
  name: string
  description?: string
  variants: IVariant[]
}

export interface IVariant {
  price: number
  name?: string
  description?: string
}

export const unnestMenu = ({ menu, restaurant }: IRestaurant): Menu =>
  menu
    .flatMap(s =>
      s.dishes.flatMap(d =>
        d.variants.map(v => ({
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
