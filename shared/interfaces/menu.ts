// Client
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
  _id: string
  price: number
  name?: string
  description?: string
}

// DB
export type Menu = MenuEntry[]

export interface MenuEntry {
  _id: string
  index: number
  restaurant: string
  section: string
  dishName: string
  dishDescription?: string
  dishVariantName?: string
  dishVariantDescription?: string
  dishVariantPrice: number
}
