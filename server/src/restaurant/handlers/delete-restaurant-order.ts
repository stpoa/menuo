import 'source-map-support/register'
import { response } from 'src/lib/http'
import { withDB } from 'src/db/db'
import { log } from 'src/logs/logs'
import { deleteOrder } from 'src/db/orders'
import { DeleteRestaurantOrder } from 'menuo-shared/interfaces/api'

export const handler = withDB(async (event, ctx, _cb) => {
  if (!(event?.pathParameters?.restaurant && event.pathParameters.order)) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params: DeleteRestaurantOrder.Params = {
    restaurant: event.pathParameters.restaurant,
    order: event.pathParameters.order,
  }

  try {
    await deleteOrder(ctx.dbClient)({
      _id: params.order,
      restaurant: params.restaurant,
    })

    return response({ kind: 'NO_CONTENT' })
  } catch (error) {
    log('Error while saving', { restaurant: params.restaurant, error })
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
})
