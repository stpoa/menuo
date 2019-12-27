import 'source-map-support/register'
import { response, AGPHA } from 'src/lib/http'
import { getMenu } from 'src/db/restaurants'

export const handler: AGPHA = async (event, _ctx, _cb) => {
  const restaurantId = event.pathParameters!.restaurantId
  const menu = await getMenu(restaurantId)

  if (!menu) {
    console.log('get-menu', JSON.stringify({ event }))
    return response({ kind: 'NOT_FOUND' })
  }

  return response({ body: menu })
}
