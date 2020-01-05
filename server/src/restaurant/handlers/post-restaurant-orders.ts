import 'source-map-support/register'
import { response } from 'src/lib/http'
import { withDB } from 'src/db/db'
import { log } from 'src/logs/logs'
import { createOrder } from 'src/db/orders'
import { CreateRestaurantOrder } from 'menuo-shared/interfaces/api'

export const handler = withDB(async (event, ctx, _cb) => {
  if (!(event.pathParameters && event.pathParameters.restaurant)) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params: CreateRestaurantOrder.Params = {
    restaurant: event.pathParameters.restaurant,
  }

  const order = JSON.parse(event.body || '')

  try {
    const result = await createOrder(ctx.dbClient)({
      ...order,
      restaurant: params.restaurant,
    })

    return response<CreateRestaurantOrder.Response>({ body: result })
  } catch (error) {
    log('Error while saving', { restaurant: params.restaurant, error })
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
})
