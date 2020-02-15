#!/usr/bin/env node

const qrcode = require('qrcode-terminal')
const ip = require('ip')

const hostIp = ip.address()
const localhostUrl = 'http://' + hostIp + ':' + process.env.PORT

const urlBase = process.env.PUBLIC_URL || localhostUrl

qrcode.generate(urlBase + '/#/kolanko/?table=1')
