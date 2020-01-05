import { MenuEntry } from "../menu";

/**
 * GET /{restaurant}/dishes
 **/
export namespace ListRestaurantDishes {
  export type Response = ResponseEntry[]
  export type ResponseEntry = MenuEntry
  export interface Params {
    restaurant: string
  }
}
