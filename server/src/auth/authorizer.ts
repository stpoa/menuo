import { verifyToken } from './token'

const generateAWSPolicy = (
  principalId: string,
  effect: string,
  resource: string,
  context?: any,
): any => {
  var authResponse: any = {}

  authResponse.principalId = principalId
  if (effect && resource) {
    var policyDocument: any = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    var statementOne: any = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }

  if (context) {
    authResponse.context = context
  }

  return authResponse
}

export const handler = (event: any, context: any, cb: any) => {
  try {
    const token = event.authorizationToken
    const secret = process.env.JWT_SECRET

    verifyToken(secret || '')(token)
      .then(t => (!t ? Promise.reject() : t))
      .then(result => {
        cb(null, generateAWSPolicy(result.iss, 'Allow', event.methodArn))
      })
      .catch(err => {
        cb('Unauthorized')
      })
  } catch (err) {
    cb('Unauthorized')
  }
}
