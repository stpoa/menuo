import 'source-map-support/register'
import { response } from 'src/lib/http'
import { withDB, getRestaurantTable } from 'src/db/db'
import { log } from 'src/logs/logs'
import { ReadRestaurantTable } from 'menuo-shared/interfaces/api'

export const handler = withDB(async (event, ctx, _cb) => {
  if (!(event.pathParameters && event.pathParameters.restaurant)) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params: ReadRestaurantTable.Params = {
    restaurant: event.pathParameters.restaurant,
    table: event.pathParameters.table,
  }

  const table = await getRestaurantTable(ctx.dbClient)(
    params.restaurant,
    params.table,
  )

  if (!table) {
    log('Restaurant not found', { restaurant: params.restaurant, menu: table })
    return response({ kind: 'NOT_FOUND' })
  }

  return response<ReadRestaurantTable.Response>({ body: table })
})
