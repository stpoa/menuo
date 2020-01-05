import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  APIGatewayProxyCallback,
  Context,
} from 'aws-lambda'
import { MongoClient } from 'mongodb'

type ResponseKind = 'OK' | 'UNAUTHORIZED' | 'UNPROCESSABLE_ENTITY' | 'NOT_FOUND'

export type AGPHA = APIGatewayProxyHandlerAsync
export type AGPHADB = APIGatewayProxyHandlerAsyncDB

export type WithDB<T> = T & { dbClient: MongoClient }

export type APIGatewayProxyHandlerAsyncDB = (
  event: APIGatewayProxyEvent,
  context: WithDB<Context>,
  callback: APIGatewayProxyCallback,
) => Promise<APIGatewayProxyResult>

export type APIGatewayProxyHandlerAsync = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: APIGatewayProxyCallback,
) => Promise<APIGatewayProxyResult>

interface ResponseConfig<T> {
  kind?: ResponseKind
  statusCode?: number
  headers?: {
    [header: string]: boolean | number | string
  }
  multiValueHeaders?: {
    [header: string]: Array<boolean | number | string>
  }
  body?: T
  isBase64Encoded?: boolean
}

export const response = <T = string>(
  { kind = 'OK', ...rest }: ResponseConfig<T> = { kind: 'OK' },
): APIGatewayProxyResult => {
  const responses: {
    [key in ResponseKind]: { statusCode: number; body?: any }
  } = {
    OK: { statusCode: 200 },
    NOT_FOUND: { statusCode: 400, body: 'Not found' },
    UNAUTHORIZED: { statusCode: 401, body: 'Unauthorized' },
    UNPROCESSABLE_ENTITY: { statusCode: 422, body: 'Unprocessable entity' },
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    ...rest.headers,
  }

  const response = { ...responses[kind], ...rest, headers }

  console.log({ response })

  return { ...response, body: JSON.stringify(response.body) }
}
