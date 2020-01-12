import { LoginWaiterUser } from 'menuo-shared/interfaces/api/auth'
import 'source-map-support/register'

import { response } from 'src/lib/http'
import { withDB, getWaiterUser } from 'src/db/db'
import { log } from 'src/logs/logs'

import { isPasswordValid } from '../validation'
import { signToken } from '../token'

import { getValidParams, getValidBody } from './validation'

export const handler = withDB(async (event, ctx, _cb) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    log('Secret is empty!')
    return response({ kind: 'INTERNAL_SERVER_ERROR' })
  }

  const params = getValidParams(event.pathParameters)
  if (!params) {
    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }

  const body = getValidBody(JSON.parse(event.body ?? ''))
  if (!body) {
    return response({ kind: 'BAD_REQUEST' })
  }

  const user = await getWaiterUser(ctx.dbClient)({ username: body.username })
  if (!user) {
    console.log('Invalid user')
    return response({ kind: 'UNAUTHORIZED' })
  }

  if (!(await isPasswordValid(body.password, user.password))) {
    console.log('Invalid password')
    return response({ kind: 'UNAUTHORIZED' })
  }

  const { _id, username, deviceId, roles } = user
  const token = signToken(secret)(user._id, { _id, username, deviceId, roles })

  return response<LoginWaiterUser.Response>({
    body: { token },
  })
})
