// Client
export type Lanuage = 'en' | 'pl'

export interface IRestaurant {
  restaurant: string
  language: Lanuage
  menu: IMenu
}

export type IMenu = ISection[]

export interface ISection {
  id: string
  name: string
  description?: string
  dishes: IDish[]
}

export interface IDish {
  id: string
  name: string
  description?: string
  variants: IVariant[]
}

export interface IVariant {
  id: string
  dishId: string
  price: number
  name?: string
  description?: string
  entry?: MenuEntry
}

// DB
export type Menu = MenuEntry[]

export interface MenuEntry {
  _id: string
  language: Lanuage
  index: number
  restaurant: string
  section: string
  sectionDescription?: string
  dishName: string
  dishDescription?: string
  dishVariantName?: string
  dishVariantDescription?: string
  dishVariantPrice: number
  priority?: number | undefined
}
