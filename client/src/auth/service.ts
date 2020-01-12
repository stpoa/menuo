import { post } from '../api'

export const readToken = () => localStorage.getItem('jwt')
export const storeToken = ({ token }: { token: string }) =>
  localStorage.setItem('jwt', token)

export const login = (
  { restaurant }: { restaurant: string },
  { username, password }: { username: string; password: string },
): Promise<string | void> =>
  post<{ token: string }>(`restaurants/${restaurant}/login`, {
    username,
    password,
  })
    .then(storeToken)
    .catch(console.log)

export const isLoggedIn = () => !!readToken()
