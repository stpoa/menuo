import Logger from 'logdna'
import zlib from 'zlib'
import { promisify } from 'util'

const parseEventGzipData = (event: { awslogs: { data: string } }) => {
  return JSON.parse(
    zlib.unzipSync(Buffer.from(event.awslogs.data, 'base64')).toString(),
  )
}

const extractJson = (message: string) => {
   const jsonStart = message.indexOf('{')
   const jsonEnd = message.lastIndexOf('}') + 1

   const json = message.slice(jsonStart, jsonEnd)
   return isValidJson(json) ? json : '{}'
}

const isValidJson = (message: string) => {
  try {
      JSON.parse(message);
  } catch (e) { return false; }
  return true;
}

const prepareLogs = (eventData: { logEvents: any[]; messageType: any; logGroup: any; logStream: any; owner: any; subscriptionFilters: any }) => {
  return eventData.logEvents.map((event: { message: string; id: any; timestamp: any }) => {

    
    const json = extractJson(event.message)
    const data = JSON.parse(json)

    let message
    if (true) {
      const [,,, ...messages] = event.message.split('\t')

      message = messages.join('').replace(json, '')
    }
    if (event.message.slice(0, 5) === 'START') {
      message = 'START'
    }
    if (event.message.slice(0, 3) === 'END') {
      message = 'END'
    }
    if (event.message.slice(0, 6) === 'REPORT') {
      message = 'REPORT'
    }

    return {
      line: JSON.stringify({
        message,
        source: 'cloudwatch',
        event: {
          type: eventData.messageType,
          id: event.id,
        },
        log: {
          group: eventData.logGroup,
          stream: eventData.logStream,
        },
        data,
      }),
      timestamp: event.timestamp,
      file: eventData.logStream,
      meta: {
        owner: eventData.owner,
        filters: eventData.subscriptionFilters,
      },
    }
  })
}

const sendLine = (payload: { map: (arg0: ({ line }: { line: any }) => any) => readonly [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown] }, callback: (arg0: string | null) => any) => {
  if (!process.env.LOGDNA_KEY) return callback('Missing LogDNA Ingestion Key')
  const apiKey = process.env.LOGDNA_KEY
  const logger = Logger.setupDefaultLogger(apiKey, {})
  const log = promisify(logger.log.bind(logger))

  Promise.all(payload.map(({ line }) => log(line, {}))).then(() =>
    callback(null),
  )
}

export const handler = (event: { awslogs: { data: string } }, _context: any, callback: any) => {
  return sendLine(prepareLogs(parseEventGzipData(event as any) as any) as any, callback)
}
