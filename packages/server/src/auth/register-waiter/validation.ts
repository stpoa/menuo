import { UnknownObject, isString, isArray } from 'src/validation'
import { RegisterWaiterUser } from '@menuo/shared/interfaces/api/auth'

export const getValidBody = (
  body: UnknownObject<RegisterWaiterUser.Body>,
): RegisterWaiterUser.Body | null => {
  const { username, password, deviceId, subscription } = body
  if (isString(username) && isString(password) && isString(deviceId)) {
    return { username, password, deviceId, subscription }
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
