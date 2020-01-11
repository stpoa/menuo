import 'source-map-support/register'

import { response, AGPHA } from 'src/lib/http'
import { log } from 'src/logs/logs'

import { authorize } from '../token'

export const handler: AGPHA = async event => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    log('Secret is empty!')
    return response({ kind: 'INTERNAL_SERVER_ERROR' })
  }

  const decodedToken = await authorize(secret)(event)
  if (!decodedToken) {
    return response({ kind: 'UNAUTHORIZED' })
  }

  return response({ body: decodedToken })
}
