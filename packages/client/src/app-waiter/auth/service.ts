import { post } from '../../api'

export const readToken = () => localStorage.getItem('jwt')
export const storeToken = ({ token }: { token: string }) =>
  localStorage.setItem('jwt', token)

export const login = (
  { restaurant }: { restaurant: string },
  {
    username,
    password,
    subscription,
  }: { username: string; password: string; subscription: any },
): Promise<string | void> =>
  post<{ token: string }>(`restaurants/${restaurant}/login`, {
    username,
    password,
    subscription,
  })
    .then(storeToken)
    .catch(console.log)

export const isLoggedIn = () => !!readToken()
