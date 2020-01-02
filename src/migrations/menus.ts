import { readdirSync, readFileSync, writeFileSync } from 'fs'
import yaml from 'js-yaml'
import { Menu, MenuEntry } from 'src/db/menus'
import { groupBy, toPairs } from 'ramda'

export interface IRestaurant {
  restaurant: string
  menu: IMenu
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

export const readMenus = (menusDir = './data/menus'): IRestaurant[] =>
  readdirSync(menusDir).map(file => ({
    restaurant: file.replace('.yml', ''),
    menu: yaml.safeLoad(readFileSync(`${menusDir}/${file}`).toString()),
  }))

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

export const parseMenus = () => {
  const menusDir = './data/menus'
  const menusParsedDir = './data/menus-parsed'

  const nestedMenus = readMenus(menusDir)
  const flatMenus = nestedMenus.map(unnestMenu)

  flatMenus.forEach(m =>
    writeFileSync(
      menusParsedDir + '/' + m[0].restaurant + '.json',
      JSON.stringify(m, null, 2),
    ),
  )
}

parseMenus()