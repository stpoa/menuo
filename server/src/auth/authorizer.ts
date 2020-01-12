import { verifyToken } from './token'

const generateAWSPolicy = (
  principalId: string,
  effect: string,
  resource: string,
  context?: any,
): any => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
  context,
})

export const handler = (event: any, context: any, cb: any) => {
  try {
    const token = event.authorizationToken
    const secret = process.env.JWT_SECRET

    verifyToken(secret || '')(token)
      .then(t => (!t ? Promise.reject() : t))
      .then(result => {
        cb(
          null,
          generateAWSPolicy(
            result.iss,
            'Allow',
            process.env.IS_OFFLINE ? event.methodArn : 'arn:aws:execute-api:*',
          ),
        )
      })
      .catch(err => {
        cb('Unauthorized')
      })
  } catch (err) {
    cb('Unauthorized')
  }
}
