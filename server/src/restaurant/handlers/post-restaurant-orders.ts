import 'source-map-support/register'
import { response } from 'src/lib/http'
import { withDB } from 'src/db/db'
import { log } from 'src/logs/logs'
import { createOrder } from 'src/db/orders'

export const handler = withDB(async (event, ctx, _cb) => {
  const restaurantId = event.pathParameters!.restaurantId
  const order = JSON.parse(event.body || '')

  try {
    await createOrder(ctx.dbClient)(restaurantId, order)
  } catch (error) {
    log('Error while saving', { restaurantId, error })
  }

  return response({ body: order })
})
