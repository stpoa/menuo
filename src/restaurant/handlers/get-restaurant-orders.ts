import 'source-map-support/register'
import { response, AGPHA } from 'src/lib/http'
import { getTables } from 'src/db/tables'

export const handler: AGPHA = async (event, _ctx, _cb) => {
  const restaurantId = event.pathParameters!.restaurantId
  const tables = await getTables(restaurantId)

  if (!tables) {
    console.log('get-orders', JSON.stringify({ event }))
    return response({ kind: 'NOT_FOUND' })
  }

  return response({ body: tables })
}
