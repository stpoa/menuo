import 'source-map-support/register'

import { response } from 'src/lib/http'
import { withDB } from 'src/db/db'
import { authorize } from 'src/auth/token'
import { getWaiterUser } from 'src/db/users'

export const handler = withDB(async (event, ctx) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return response({ kind: 'INTERNAL_SERVER_ERROR' })
  }

  const decodedToken = await authorize<{ context: { username: string } }>(
    secret,
  )(event)
  if (!decodedToken) {
    return response({ kind: 'UNAUTHORIZED' })
  }

  const username = decodedToken.context.username
  if (!username) {
    return response({ kind: 'UNAUTHORIZED' })
  }

  const user = await getWaiterUser(ctx.dbClient)({ username })
  if (!user) {
    return response({ kind: 'UNAUTHORIZED' })
  }

  return response({ body: user.tables || [] })
})
