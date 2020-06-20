import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { SES } from 'aws-sdk'

const ses = new SES()

interface FormData {
  email: string
  first_name: string
  last_name: string
  menu: string
  message: string
  phone: string
  restaurant_name: string
  table_list: string
  waiters_count: string
}

const sendEmail = (formData: FormData) => {
  const emailParams = {
    Source: 'slawek@menuo.app',
    ReplyToAddresses: [formData.email],
    Destination: {
      ToAddresses: ['slawek@menuo.app'],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `${formData.message}\n\nName: ${formData.first_name}\nEmail: ${formData.email}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'New message from your_site.com',
      },
    },
  }

  return ses.sendEmail(emailParams).promise()
}

export const staticSiteMailer: APIGatewayProxyHandler = async (
  event,
  _context,
): Promise<APIGatewayProxyResult> => {
  const formData = JSON.parse(event.body)

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  const sendMailErrorResponse = (e: any) => ({
    statusCode: 500,
    headers,
    body: e,
  })

  try {
    await sendEmail(formData)
  } catch (e) {
    return sendMailErrorResponse(e)
  }

  return {
    statusCode: 200,
    headers,
    body: '',
  }
}
