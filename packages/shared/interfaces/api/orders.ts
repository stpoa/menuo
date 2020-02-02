import { Order } from '../orders'

/**
 * GET /{restaurant}/orders
 **/
export namespace ListRestaurantOrders {
  export type Params = { restaurant: string }
  export type Response = ResponseEntry[]
  export type ResponseEntry = Order
}

/**
 * POST /{restaurant}/orders
 **/
export namespace CreateRestaurantOrder {
  export type Params = { restaurant: string }
  export type Body = Omit<Order, '_id' | 'restaurant'>
  export type Response = { _id: string }
}

/**
 * PUT /{restaurant}/orders/{order}
 **/
export namespace UpdateRestaurantOrder {
  export type Params = { restaurant: string; order: string }
  export type Body = Partial<Order>
  export type Response = { _id: string }
}

/**
 * DELETE /{restaurant}/orders/{order}
 **/
export namespace DeleteRestaurantOrder {
  export type Params = { restaurant: string; order: string }
}

/**
 * DELETE /{restaurant}/orders/?table={table}
 **/
export namespace DeleteRestaurantOrders {
  export type Params = { restaurant: string }
  export type QueryParams = { table: string; tableStatus: string }
}
