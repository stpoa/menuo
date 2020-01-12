import 'source-map-support/register'
import { RegisterWaiterUser } from 'menuo-shared/interfaces/api/auth'

import { response } from 'src/lib/http'
import { withDB, createWaiterUser, getWaiterUser } from 'src/db/db'
import { log } from 'src/logs/logs'

import bcrypt from 'bcryptjs'

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

  const body = getValidBody(JSON.parse(event.body || ''))
  if (!body) {
    log('Empty body')
    return response({ kind: 'UNAUTHORIZED' })
  }

  try {
    const user = await getWaiterUser(ctx.dbClient)({ username: body.username })
    if (user) {
      log('User already exists')
      return response({ kind: 'UNPROCESSABLE_ENTITY' })
    }

    const roles = ['waiter' as 'waiter']

    const _id =
      (await createWaiterUser(ctx.dbClient)({
        ...body,
        roles,
        restaurant: params.restaurant,
        password: await bcrypt.hash(body.password, 8),
      })) + ''

    const { username, deviceId } = body
    const token = signToken(secret)(_id, { _id, username, deviceId, roles })

    return response<RegisterWaiterUser.Response>({ body: { token } })
  } catch (error) {
    log('Error while saving')

    return response({ kind: 'UNPROCESSABLE_ENTITY' })
  }
})
