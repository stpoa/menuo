import webPush from 'web-push'
import { Lambda } from 'aws-sdk'

const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY

webPush.setVapidDetails(
  'mailto:test@example.com',
  publicVapidKey!,
  privateVapidKey!,
)

export const sendNotification = ({ title, body }) => async subscription => {
  console.log('Sending notification', { title, body })
  return webPush
    .sendNotification(subscription, JSON.stringify({ title, body }))
    .catch(error => console.error(error))
}

export const sendNotifications = ({
  functionName,
}: {
  functionName: string
}) => (subscriptions: any[]) => (title: string, body: string) => {
  // ctx.callbackWaitsForEmptyEventLoop = false
  const [serviceName, serviceStage] = functionName.split('-')
  const region = 'eu-central-1'

  console.log('a')
  const lambda = new Lambda({
    region,
    endpoint: process.env.IS_OFFLINE
      ? 'http://localhost:3000'
      : `https://lambda.${region}.amazonaws.com`,
  })
  const getFunctionName = getLambdaName(serviceName)(serviceStage)

  console.log('b')

  lambda.invoke(
    {
      FunctionName: getFunctionName('send_notifications'),
      InvocationType: 'Event',
      Payload: JSON.stringify({
        subscriptions,
        body,
        title,
      }),
    },
    (e, v) => {
      console.log({ e, v })
    },
  )
  console.log('c')
}

const getLambdaName = (serviceName: string) => (serviceStage: string) => (
  lambdaName: string,
) => `${serviceName}-${serviceStage}-${lambdaName}`
