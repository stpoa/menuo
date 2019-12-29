import 'source-map-support/register'
import { response } from 'src/lib/http'
import { getMenu, withDB } from 'src/db/db'
import { log } from 'src/logs/logs'

export const handler = withDB(async (event, ctx, _cb) => {
  const restaurantId = event.pathParameters!.restaurantId
  const menu = await getMenu(ctx.dbClient)(restaurantId)

  if (!menu) {
    log('Menu not found', { restaurantId, menu })
    return response({ kind: 'NOT_FOUND' })
  }

  return response({ body: menu })
})
