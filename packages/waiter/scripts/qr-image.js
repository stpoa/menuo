#!/usr/bin/env node

const { createQrCode } = require('@menuo/qr')
const ip = require('ip')
const { readdirSync, existsSync, lstatSync, readFileSync } = require('fs')

const isDirectory = source => lstatSync(source).isDirectory()

const readTables = (inDataDir = 'public/data', outDataDir = 'build/data') =>
  readdirSync(inDataDir)
    .map(restaurant => ({
      restaurant,
      inDir: inDataDir + '/' + restaurant,
      outDir: outDataDir + '/' + restaurant,
    }))
    .filter(({ inDir }) => isDirectory(inDir))
    .map(({ inDir, ...rest }) => ({
      ...rest,
      inDir,
      tables: JSON.parse(readFileSync(inDir + '/tables.json').toString()),
    }))

const hostIp = ip.address()
const localhostUrl = 'http://' + hostIp + ':' + (+(process.env.PORT || 0) - 1)
const urlBase =
  process.env.PUBLIC_URL.replace('/waiter', '/menu') || localhostUrl

const qrData = readTables().map(({ restaurant, tables, outDir }) =>
  tables
    .map(table => ({
      path: outDir + '/qr/' + table + '.svg',
      data: `${urlBase}/#/${restaurant}/?table=${table}`,
    }))
    .filter(({ path }) => !existsSync(path)),
)

const wait = time => new Promise(resolve => setTimeout(resolve, time))

const run = async () => {
  for (const qrs of qrData) {
    for (const qr of qrs) {
      console.log(qr)
      await wait(1000)
      await createQrCode({ size: 400 })(qr)
    }
  }
}

run()
