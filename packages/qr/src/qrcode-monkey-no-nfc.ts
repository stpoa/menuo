import fetch from 'node-fetch'
import fs from 'fs'

const decomposeUrlParams = (url: string) =>
  Object.fromEntries([...new URL(url).searchParams.entries()])

export interface QRPathData {
  path: string
  data: string
}

export const getFolderPath = (path: string) => {
  const [_, ...paths] = path.split('/').reverse()
  return paths.reverse().join('/')
}

export const createQrCode = (parameters = {}) => async ({
  path,
  data,
}: QRPathData) => {
  const folderPath = getFolderPath(path)
  const defaultParams = decomposeUrlParams(
    'https://qr-generator.qrcode.studio/qr/custom?download=true&file=png&data=https%3A%2F%2Fmenuo.app%2Fmenu%2F%23%2Fdemo%3Ftable%3D1&size=275&config=%7B%22body%22%3A%22dot%22%2C%22eye%22%3A%22frame4%22%2C%22eyeBall%22%3A%22ball0%22%2C%22erf1%22%3A%5B%5D%2C%22erf2%22%3A%5B%5D%2C%22erf3%22%3A%5B%5D%2C%22brf1%22%3A%5B%5D%2C%22brf2%22%3A%5B%5D%2C%22brf3%22%3A%5B%5D%2C%22bodyColor%22%3A%22%23000000%22%2C%22bgColor%22%3A%22%23FFFFFF%22%2C%22eye1Color%22%3A%22%23000000%22%2C%22eye2Color%22%3A%22%23000000%22%2C%22eye3Color%22%3A%22%23000000%22%2C%22eyeBall1Color%22%3A%22%23000000%22%2C%22eyeBall2Color%22%3A%22%23000000%22%2C%22eyeBall3Color%22%3A%22%23000000%22%2C%22gradientColor1%22%3A%22%22%2C%22gradientColor2%22%3A%22%22%2C%22gradientType%22%3A%22linear%22%2C%22gradientOnEyes%22%3A%22true%22%2C%22logo%22%3A%22%22%2C%22logoMode%22%3A%22default%22%7D',
  )

  try {
    fs.mkdirSync(folderPath, { recursive: true })
  } catch (e) {}

  const newConfig = JSON.stringify(JSON.parse(defaultParams.config))
  const params = {
    ...defaultParams,
    file: path.split('.').reverse()[0],
    data,
    config: newConfig,
    ...parameters,
  }

  console.log(params)

  const url =
    'https://qr-generator.qrcode.studio/qr/custom?' +
    new URLSearchParams(params).toString()

  const d = await fetch(url).then(res => res.buffer())
  if (d.length < 10000) {
    console.log(d)
    throw new Error('To small file')
  }
  fs.writeFileSync('./data/QrTooLarge/' + path, d)
}
