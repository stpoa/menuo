import 'source-map-support/register'
import { response, APIGatewayProxyHandlerAsync } from 'src/lib/http'
import { safeLoad as yaml } from 'js-yaml'
import { readFileSync } from 'fs'
import { join } from 'path'
import { Menu } from 'src/db/menu'

const getMenu = (restaurantId: string): Menu | undefined => {
  const url = join(process.cwd(), 'src', 'db', 'menus.yml')

  return yaml(readFileSync(url) + '').find(
    m => m.restaurantId == restaurantId,
  )
}

export const handler: APIGatewayProxyHandlerAsync = async (
  event,
  _ctx,
  _cb,
) => {
  const { restaurantId } = event.pathParameters
  const menu = getMenu(restaurantId)

  return response({ body: menu })
}
