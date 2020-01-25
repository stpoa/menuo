import jwt from 'jsonwebtoken'

export const signToken = (secret: string) => (id: string, context: any) =>
  jwt.sign({ iss: id, context }, secret, { expiresIn: '30d' })

export const decodeToken = <T extends {}>(secret: string) => (
  token: string,
) => {
  return new Promise<T>((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded as T)
    })
  })
}

export const authorize = (secret: string) => (event: {
  headers: { [x: string]: any }
}) => {
  const token = event.headers['Authorization']
  return token && decodeToken(secret)(token)
}
