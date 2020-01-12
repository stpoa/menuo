import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export const signToken = (secret: string) => (id: string, context: any) =>
  jwt.sign({ iss: id, context }, secret, { expiresIn: '30d' })

export const verifyToken = <T = any>(secret: string) => (
  token: string,
): Promise<T | null> => {
  const verify = promisify(jwt.verify.bind(jwt))
  return verify(token, secret).catch(() => null)
}

export const authorize = (secret: string) => (event: {
  headers: { [x: string]: any }
}) => {
  const token = event.headers['Authorization']
  return token && verifyToken(secret)(token)
}
