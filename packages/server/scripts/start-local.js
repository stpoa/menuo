require('dotenv').config()

const { spawn } = require('child_process')
const { LOCAL_PORT } = process.env

console.log('Starting local server on port: ' + LOCAL_PORT)

spawn('sls', ['offline', 'start', '--port', LOCAL_PORT], {
  stdio: 'inherit',
})
