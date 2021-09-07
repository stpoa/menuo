import 'source-map-support/register'
import { SES } from 'aws-sdk'

import { response } from 'src/lib/http'
import { buildEmailParams } from '../email'

export const handler = async function (event: any) {
  // TODO: Define interface
  const { subscriptions, body, title } = event

  try {
    await sendEmailWithOrder({ table: '1233' })
  } catch (e) {
    console.log(e)
    return response({ kind: 'NOT_FOUND' })
  }

  return response({ body: event })
}

function sendEmailWithOrder({ table }: { table: string }) {
  const from = 'hi@menuo.app'
  const to = ['hi@menuo.app']
  const replyTo = to
  const subject = `Nowe zamówienie (Solar Gliwice) od ${table}`
  // TODO: Generate proper message
  const message = `
    kto kupił
    Kod
    Nazwa
    Marka
    ilość szt.
  `

  const ses = new SES()
  return ses
    .sendEmail(buildEmailParams({ from, to, replyTo, message, subject }))
    .promise()
}
