import { Table } from '../tables'

/**
 * GET /{restaurant}/tables/{table}
 **/
export namespace ReadRestaurantTable {
  export type Params = { restaurant: string; table: string }
  export type Response = Table
}
