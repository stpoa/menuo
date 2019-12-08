import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  APIGatewayEventRequestContext,
  APIGatewayProxyCallback,
} from 'aws-lambda'

type ResponseKind = 'OK' | 'UNAUTHORIZED' | 'UNPROCESSABLE_ENTITY'

export type APIGatewayProxyHandlerAsync = (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext,
  callback: APIGatewayProxyCallback,
) => Promise<APIGatewayProxyResult>

interface ResponseConfig {
  kind?: ResponseKind
  statusCode?: number
  headers?: {
    [header: string]: boolean | number | string
  }
  multiValueHeaders?: {
    [header: string]: Array<boolean | number | string>
  }
  body?: {}
  isBase64Encoded?: boolean
}

export const response = (
  { kind = 'OK', ...rest }: ResponseConfig = { kind: 'OK' },
): APIGatewayProxyResult => {
  const responses: {
    [key in ResponseKind]: { statusCode: number; body?: any }
  } = {
    OK: { statusCode: 200 },
    UNAUTHORIZED: { statusCode: 401, body: 'Unauthorized' },
    UNPROCESSABLE_ENTITY: { statusCode: 422, body: 'Unprocessable entity' },
  }

  const response = { ...responses[kind], ...rest }

  return { ...response, body: JSON.stringify(response.body) }
}
