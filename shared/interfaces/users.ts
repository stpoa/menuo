export type UserRole = 'waiter' | 'customer'

export type User = CustomerUser | WaiterUser

export type CustomerUser = UnregisteredUser

export interface WaiterUser extends RegisteredUser {
  restaurant: string
}

export interface UnregisteredUser {
  deviceId: string
  roles: UserRole[]
}

export interface RegisteredUser extends UnregisteredUser {
  _id: string
  username: string
  password: string
}
