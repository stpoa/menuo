#!/usr/bin/env node

const { readMenus } = require('@menuo/shared')
const { unnestMenu } = require('@menuo/shared')
const { outputFileSync } = require('fs-extra')

const flatMenus = readMenus().map(unnestMenu)

flatMenus.forEach(m => {
  const { restaurant, language } = m[0]

  outputFileSync(
    `./public/data/${restaurant}/menu/${language}.json`,
    JSON.stringify(m, null, 2),
  )
})
