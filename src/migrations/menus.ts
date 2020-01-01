import { readdirSync, readFileSync } from 'fs'
import yaml from 'js-yaml'
import { Menu } from 'src/db/menus'

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

export const readMenus = (menusDir = './data/menus') =>
  readdirSync(menusDir).map(file => ({
    restaurant: file.replace('.yml', ''),
    menu: yaml.safeLoad(readFileSync(`${menusDir}/${file}`).toString()),
  }))

export const flattenMenu = ({ menu, restaurant }: IRestaurant): Menu =>
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
