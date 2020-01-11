import 'source-map-support/register'
import { response } from 'src/lib/http'
import { getRestaurantOrders, withDB } from 'src/db/db'
import { ListRestaurantOrders } from 'menuo-shared/interfaces/api'
import { authorize } from 'src/auth/token'

export const handler = withDB(async (event, ctx, _cb) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return response({ kind: 'INTERNAL_SERVER_ERROR' })
  }
  const decodedToken = await authorize(secret)(event)
  if (!decodedToken) {
    return response({ kind: 'UNAUTHORIZED' })
  }
  if (!event?.pathParameters?.restaurant) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params: ListRestaurantOrders.Params = {
    restaurant: event.pathParameters.restaurant,
  }

  const orders = await getRestaurantOrders(ctx.dbClient)(params.restaurant)

  return response<ListRestaurantOrders.Response>({ body: orders })
})
