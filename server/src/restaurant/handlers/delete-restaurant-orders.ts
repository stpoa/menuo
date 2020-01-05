import 'source-map-support/register'
import { response } from 'src/lib/http'
import { withDB } from 'src/db/db'
import { log } from 'src/logs/logs'
import { deleteOrders } from 'src/db/orders'
import { DeleteRestaurantOrders } from 'menuo-shared/interfaces/api'

export const handler = withDB(async (event, ctx, _cb) => {
  if (
    !(
      event.pathParameters &&
      event.pathParameters.restaurant &&
      event.queryStringParameters &&
      event.queryStringParameters.table &&
      event.queryStringParameters.tablestatus
    )
  ) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params: DeleteRestaurantOrders.Params &
    DeleteRestaurantOrders.QueryParams = {
    restaurant: event.pathParameters.restaurant,
    table: event.queryStringParameters.table,
    tableStatus: event.queryStringParameters.tablestatus,
  }

  try {
    await deleteOrders(ctx.dbClient)({
      restaurant: params.restaurant,
      table: params.table,
      tableStatus: params.tableStatus,
    })

    return response({ kind: 'NO_CONTENT' })
  } catch (error) {
    log('Error while saving', { restaurant: params.restaurant, error })

    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
})
