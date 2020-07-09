export interface SendEmailInput {
  from: string
  to: string[]
  replyTo: string[]
  message: string
  subject: string
}

export const buildEmailParams = (data: SendEmailInput) => {
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
