import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
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
  const SOURCE_EMAIL = 'hi@menuo.app'
  const DESTINATION_EMAIL = 'hi@menuo.app'

  const {
    email,
    message,
    first_name,
    restaurant_name,
    last_name,
    menu,
    phone,
    table_list,
    waiters_count,
  } = formData

  const messageData = `
${message}

-----------------------------------------------------------------------------
Restauracja: ${restaurant_name}
Autor: ${first_name} ${last_name}
Email: ${email}
Telefon: ${phone}
Liczba kelnerów: ${waiters_count}
Menu: ${menu}
Lista stolików: ${table_list}
`

  const emailParams = {
    Source: SOURCE_EMAIL,
    ReplyToAddresses: [email],
    Destination: {
      ToAddresses: [DESTINATION_EMAIL],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: messageData,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Nowa wiadomość z formularza menuo od ${restaurant_name}`,
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
    statusCode: 400,
    headers,
    body: e,
  })

  try {
    await sendEmail(formData)
  } catch (e) {
    console.log(e)
    return sendMailErrorResponse(e)
  }

  return {
    statusCode: 200,
    headers,
    body: '',
  }
}
