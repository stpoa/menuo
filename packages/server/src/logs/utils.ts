import { AGPHADB, AGPHA } from 'src/lib/http'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyCallback,
  Context,
} from 'aws-lambda'

export const withCatch = <C extends Context>(f: AGPHA | AGPHADB) => (
  event: APIGatewayProxyEvent,
  ctx: C,
  cb: APIGatewayProxyCallback,
) =>
  f(event, ctx as any, cb)
    .then(result => {
      cb(null, result)
    })
    .catch(e => {
      console.log(e)
      cb(e)
    })
