import { get } from '../../api'

export const getRestaurant = (id: string) => get<IRestaurant>(`/menus/${id}`)

export interface IRestaurant {
  restaurantId: string
  menu: ISection[]
}

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
