import { WaiterUser } from '../users'

/**
 * POST /{restaurant}/register
 **/
export namespace RegisterWaiterUser {
  export type Params = { restaurant: string }
  export type Body = Omit<WaiterUser, '_id' | 'restaurant' | 'roles'>
  export type Response = { token: string }
}

export namespace LoginWaiterUser {
  export type Params = { restaurant: string }
  export type Body = Pick<WaiterUser, 'username' | 'password'>
  export type Response = { token: string }
}
