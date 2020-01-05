import { get } from '../../api'
import { ReadRestaurantTable, ListRestaurantDishes } from 'menuo-shared/interfaces/api'

export const getRestaurantDishes = ({ restaurant }: ListRestaurantDishes.Params) =>
  get<ListRestaurantDishes.Response>(`/restaurants/${restaurant}/dishes`)

export const getRestaurantTable = ({ restaurant, table }: ReadRestaurantTable.Params) =>
  get<ReadRestaurantTable.Response>(`/restaurants/${restaurant}/tables/${table}`)
