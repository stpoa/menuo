import { authorize } from './token'

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
    const token = event.authorizationToken.substring(7)
    const secret = process.env.JWT_SECRET

    authorize(secret)(token)
      .then(result => {
        cb(null, generateAWSPolicy(result.sub, 'Allow', event.methodArn))
      })
      .catch(err => {
        console.log(err)
        cb('Unauthorized')
      })
  } catch (err) {
    console.log(err)
    cb('Unauthorized')
  }
}
