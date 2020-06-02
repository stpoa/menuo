import { RestaurantConfig } from '../config'

/**
 * GET /{restaurant}/config.json
 **/
export namespace GetRestaurantConfig {
  export type Response = RestaurantConfig
  export interface Params {
    restaurant: string
  }
}
