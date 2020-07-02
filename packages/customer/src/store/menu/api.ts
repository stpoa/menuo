import { get, put, post, getStaticJSONData } from '../../api'
import {
  ReadRestaurantTable,
  ListRestaurantDishes,
  CreateRestaurantOrder,
  UpdateRestaurantOrder,
} from '@menuo/shared/interfaces/api'
import { Table } from '@menuo/shared/interfaces/tables'
import { readSubscription } from '../../notifications'

export const listRestaurantDishes = ({
  restaurant,
}: ListRestaurantDishes.Params) =>
  get<ListRestaurantDishes.Response>(`/restaurants/${restaurant}/dishes`)

export const getRestaurantDishes = ({
  restaurant,
  language = 'pl',
}: {
  restaurant: string
  language?: string
}): Promise<ListRestaurantDishes.Response> =>
  getStaticJSONData(`${restaurant}/menu/${language}.json`)

export const readRestaurantTable = ({
  restaurant,
  table,
}: ReadRestaurantTable.Params) =>
  get<ReadRestaurantTable.Response>(
    `/restaurants/${restaurant}/tables/${table}`,
  )

export const createRestaurantOrder = (
  { restaurant }: CreateRestaurantOrder.Params,
  order: CreateRestaurantOrder.Body,
) =>
  post<CreateRestaurantOrder.Response, typeof order>(
    `/restaurants/${restaurant}/orders`,
    order,
  )

export const updateRestaurantOrder = (
  { restaurant, order }: UpdateRestaurantOrder.Params,
  updates: UpdateRestaurantOrder.Body,
) =>
  put<UpdateRestaurantOrder.Response, typeof updates>(
    `/restaurants/${restaurant}/orders/${order}`,
    updates,
  )

// Helpers

export const changeTableStatus = (status: string) => (
  restaurant: string,
  table: Table,
) => {
  return createRestaurantOrder(
    { restaurant },
    {
      customerSub: readSubscription(),
      status: '',
      table: { ...table, status },
      entries: [],
      customer: '',
      waiter: '',
    },
  )
}
export const summonWaiter = changeTableStatus('summon-waiter')
export const payByCard = changeTableStatus('pay-card')
export const payInCash = changeTableStatus('pay-cash')
