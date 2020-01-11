import { UnknownObject, isString } from 'src/validation'
import { LoginWaiterUser } from 'menuo-shared/interfaces/api/auth'

export const getValidBody = (
  body: UnknownObject<LoginWaiterUser.Body>,
): LoginWaiterUser.Body | null => {
  const { username, password } = body
  if (isString(username) && isString(password)) {
    return { username, password }
  }
  return null
}

export const getValidParams = (params: any): LoginWaiterUser.Params | null => {
  const { restaurant } = params as UnknownObject<LoginWaiterUser.Params>
  if (isString(restaurant)) {
    return { restaurant }
  }
  return null
}
