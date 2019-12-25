import 'source-map-support/register'
import { response, AGPHA } from 'src/lib/http'
import { getRestaurant } from 'src/db/restaurants'
import log from 'lambda-log'

export const handler: AGPHA = async (event, _ctx, _cb) => {
  const restaurantId = event.pathParameters!.restaurantId

  console.log('get-menu', JSON.stringify({ event }))

  const menu = await getRestaurant(restaurantId).catch(log.error)

  if (!menu) {
    return response({ kind: 'NOT_FOUND' })
  }

  return response({ body: menu })
}
