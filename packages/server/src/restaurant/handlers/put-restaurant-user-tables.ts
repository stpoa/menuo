import 'source-map-support/register'
import { response } from 'src/lib/http'
import { withDB } from 'src/db/db'
import { log } from 'src/logs/logs'
import { authorize } from 'src/auth/token'
import { updateWaiterUser } from 'src/db/users'

export const handler = withDB(async (event, ctx, _cb) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return response({ kind: 'INTERNAL_SERVER_ERROR' })
  }

  if (!event?.pathParameters?.restaurant) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
  const params = {
    restaurant: event.pathParameters.restaurant,
  }
  const decodedToken = await authorize<{ context: { _id: string } }>(secret)(
    event,
  )
  if (!decodedToken) {
    return response({ kind: 'UNAUTHORIZED' })
  }

  const updates: any = JSON.parse(event.body ?? '{}')

  try {
    await updateWaiterUser(ctx.dbClient)(
      {
        _id: decodedToken.context._id,
      },
      updates,
    )
  } catch (error) {
    log('Error while saving', { restaurant: params.restaurant, error })
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }

  return response({})
})
