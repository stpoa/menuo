import 'source-map-support/register'
import { response, AGPHA } from 'src/lib/http'
import { getMenu } from 'src/db/menus'
import log from 'lambda-log'

export const handler: AGPHA = async (event, _ctx, _cb) => {
  const restaurantId = event.pathParameters!.restaurantId

  const menu = await getMenu(restaurantId).catch(log.error)

  if (!menu) {
    return response({ kind: 'NOT_FOUND' })
  }

  return response({ body: menu })
}
