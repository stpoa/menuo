import 'source-map-support/register'
import { response } from 'src/lib/http'
import { withDB } from 'src/db/db'
import { log } from 'src/logs/logs'
import { updateOrder } from 'src/db/orders'
import { UpdateRestaurantOrder } from '@menuo/shared/interfaces/api'
import { sendNotifications } from 'src/notifications/notifications'

export const handler = withDB(async (event, ctx, _cb) => {
  if (!(event?.pathParameters?.restaurant && event.pathParameters.order)) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params: UpdateRestaurantOrder.Params = {
    restaurant: event.pathParameters.restaurant,
    order: event.pathParameters.order,
  }

  const updates: UpdateRestaurantOrder.Body = JSON.parse(event.body ?? '')

  try {
    const order = await updateOrder(ctx.dbClient)({
      ...updates,
      restaurant: params.restaurant,
      _id: params.order,
    })

    if (updates.status === 'accepted') {
      sendNotifications(ctx)([order!.customerSub])(
        'Zamówienie w przygotowaniu! ',
        'Twoje zamówienie jest w trakcie przygotowania, kelner wkrótce przyniesie je do stołu',
      )
    }
  } catch (error) {
    log('Error while saving', { restaurant: params.restaurant, error })
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }

  return response<UpdateRestaurantOrder.Response>({
    body: { _id: params.order },
  })
})
