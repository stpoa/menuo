import 'source-map-support/register'
import { response } from 'src/lib/http'
import { withDB, getWaiterUser, getRestaurantWaiterUsers } from 'src/db/db'
import { log } from 'src/logs/logs'
import { createOrder } from 'src/db/orders'
import { CreateRestaurantOrder } from 'menuo-shared/interfaces/api'
import { sendNotifications } from 'src/notifications/notifications'

export const handler = withDB(async (event, ctx, _cb) => {
  if (!event?.pathParameters?.restaurant) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params: CreateRestaurantOrder.Params = {
    restaurant: event.pathParameters.restaurant,
  }

  const order: CreateRestaurantOrder.Body = JSON.parse(event.body ?? '')

  try {
    const result = await createOrder(ctx.dbClient)({
      ...order,
      restaurant: params.restaurant,
    })

    const waiterSubscriptions = (
      await getRestaurantWaiterUsers(ctx.dbClient)({
        restaurant: params.restaurant,
      })
    ).map(w => w.subscription)

    sendNotifications(ctx)(waiterSubscriptions)(
      'Nowe zamówienie przy stole ' + order.table.name,
      order.entries.flatMap(([e, n]) => e.dishName + ' x ' + n).join(', '),
    )

    return response<CreateRestaurantOrder.Response>({ body: result })
  } catch (error) {
    log('Error while saving', { restaurant: params.restaurant, error })
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
})
