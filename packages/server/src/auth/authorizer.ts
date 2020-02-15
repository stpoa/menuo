import { decodeToken } from './token'

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

export const handler = async (event: any) => {
  try {
    const token = event.authorizationToken
    const secret = process.env.JWT_SECRET || ''
    console.log(!!token, !!secret)

    const decoded = await decodeToken<{ iss: string }>(secret)(token)
    console.log({ decoded })

    return generateAWSPolicy(
      decoded.iss,
      'Allow',
      process.env.IS_OFFLINE ? event.methodArn : 'arn:aws:execute-api:*',
    )
  } catch (err) {
    console.log({ err })
    return 'Unauthorized'
  }
}
