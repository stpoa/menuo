import 'source-map-support/register'
import { response } from 'src/lib/http'
import { getRestaurantDishes, withDB } from 'src/db/db'
import { log } from 'src/logs/logs'
import { ListRestaurantDishes } from '@menuo/shared/interfaces/api'

export const handler = withDB(async (event, ctx, _cb) => {
  if (!event?.pathParameters?.restaurant) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params: ListRestaurantDishes.Params = {
    restaurant: event.pathParameters.restaurant,
  }

  const dishes = await getRestaurantDishes(ctx.dbClient)(params.restaurant)

  if (!dishes) {
    log('Menu not found', { restaurant: params.restaurant, menu: dishes })
    return response({ kind: 'NOT_FOUND' })
  }

  return response<ListRestaurantDishes.Response>({ body: dishes })
})
