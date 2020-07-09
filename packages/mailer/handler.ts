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

interface SendEmailInput {
  from: string
  to: string[]
  replyTo: string[]
  message: string
  subject: string
}

const buildEmailParams = (data: SendEmailInput) => {
  const emailParams = {
    Source: data.from,
    ReplyToAddresses: data.replyTo,
    Destination: {
      ToAddresses: data.to,
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: data.message,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: data.subject,
      },
    },
  }

  return emailParams
}

function sendContactEmail(formData: FormData) {
  const from = 'hi@menuo.app'
  const to = ['hi@menuo.app']
  const {
    email,
    message: messageFormText,
    first_name,
    restaurant_name,
    last_name,
    menu,
    phone,
    table_list,
    waiters_count,
  } = formData
  const replyTo = [email]
  const subject = `Nowa wiadomość z formularza menuo od ${restaurant_name}`
  const message = `
${messageFormText}

-----------------------------------------------------------------------------
Restauracja: ${restaurant_name}
Autor: ${first_name} ${last_name}
Email: ${email}
Telefon: ${phone}
Liczba kelnerów: ${waiters_count}
Menu: ${menu}
Lista stolików: ${table_list}
`

  return ses
    .sendEmail(buildEmailParams({ from, to, replyTo, message, subject }))
    .promise()
}

export const staticSiteMailer: APIGatewayProxyHandler = async function (
  event,
  _context,
): Promise<APIGatewayProxyResult> {
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
    await sendContactEmail(formData)
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
