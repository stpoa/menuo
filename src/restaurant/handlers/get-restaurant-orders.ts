import 'source-map-support/register'
import { response } from 'src/lib/http'
import { getOrders, withDB } from 'src/db/db'
import { log } from 'src/logs/logs'

export const handler = withDB(async (event, ctx, _cb) => {
  const restaurantId = event.pathParameters!.restaurantId
  const { tables } = await getOrders(ctx.dbClient)(restaurantId)

  if (!tables) {
    log('Order not found', { restaurantId, tables })
    return response({ kind: 'NOT_FOUND' })
  }

  return response({ body: tables })
})
