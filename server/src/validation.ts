import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyCallback,
} from 'aws-lambda'
import log from 'lambda-log'

export interface ValidatorConfig {
  validator: (e: APIGatewayProxyEvent) => Boolean | Promise<Boolean>
  result: APIGatewayProxyResult
  message: string
}

export const validateEvent = (validatorConfig: ValidatorConfig[]) => (
  callback: APIGatewayProxyCallback,
) => (event: APIGatewayProxyEvent) =>
  Promise.all(
    validatorConfig.map(async ({ validator, message, result }) => {
      if (!(await Promise.resolve(validator(event)))) {
        log.warn(message)
        return callback(null, result)
      }
    }),
  )
