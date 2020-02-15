import { UnknownObject, isString } from 'src/validation'
import { RegisterWaiterUser } from '@menuo/shared/interfaces/api/auth'
import { isArray } from 'util'

export const getValidBody = (
  body: UnknownObject<RegisterWaiterUser.Body>,
): RegisterWaiterUser.Body | null => {
  const { username, password, deviceId, subscription, tables } = body
  if (
    isString(username) &&
    isString(password) &&
    isString(deviceId) &&
    isArray(tables) &&
    tables.every(isString)
  ) {
    return { username, password, deviceId, subscription, tables }
  }
  return null
}

export const getValidParams = (
  params: any,
): RegisterWaiterUser.Params | null => {
  const { restaurant } = params as UnknownObject<RegisterWaiterUser.Params>
  if (isString(restaurant)) {
    return { restaurant }
  }
  return null
}
