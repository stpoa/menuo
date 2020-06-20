import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

export const staticSiteMailer: APIGatewayProxyHandler = async (
  event,
  _context,
): Promise<APIGatewayProxyResult> => {
  const formData = JSON.parse(event.body)

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  console.log({ formData, headers })

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(
      {
        message:
          'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2,
    ),
  }
}
