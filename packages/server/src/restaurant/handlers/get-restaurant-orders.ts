import 'source-map-support/register'
import { response } from 'src/lib/http'
import { withDB } from 'src/db/db'
import { ListRestaurantOrders } from '@menuo/shared/interfaces/api'
import { getRestaurantOrders } from 'src/db/orders'

export const handler = withDB(async (event, ctx, _cb) => {
  if (!event?.pathParameters?.restaurant) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params: ListRestaurantOrders.Params = {
    restaurant: event.pathParameters.restaurant,
  }

  const orders = await getRestaurantOrders(ctx.dbClient)(params.restaurant)
  return response<ListRestaurantOrders.Response>({ body: orders })
})
