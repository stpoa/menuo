import 'source-map-support/register'

import { response, AGPHA } from 'src/lib/http'
import { sendNotification } from '../notifications'

export const handler = async (event: any) => {
  const { subscriptions, body, title } = event

  await Promise.all(subscriptions.map(sendNotification({ body, title })))

  return response({ body: event })
}
