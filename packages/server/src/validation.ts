import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyCallback,
} from 'aws-lambda'

export interface ValidatorConfig {
  validator: (e: APIGatewayProxyEvent) => Boolean | Promise<Boolean>
  result: APIGatewayProxyResult
  message: string
}

export const validateEvent = (validatorConfig: ValidatorConfig[]) => (
  callback: APIGatewayProxyCallback,
) => (event: APIGatewayProxyEvent) =>
  Promise.all(
    validatorConfig.map(async ({ validator, result }) => {
      if (!(await Promise.resolve(validator(event)))) {
        return callback(null, result)
      }
    }),
  )

export type UnknownObject<O extends object> = {
  [K in keyof O]: O[K] extends object ? unknown | UnknownObject<O[K]> : unknown
}

export const isNumber = (variableToCheck: any): variableToCheck is number =>
  typeof variableToCheck === 'number'

export const isString = (variableToCheck: any): variableToCheck is string =>
  typeof variableToCheck === 'string'

export const isArray = (variableToCheck: any): variableToCheck is Array<any> =>
  Array.isArray(variableToCheck)
