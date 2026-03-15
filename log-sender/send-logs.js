const https = require('https')
const http = require('http')

const API_URL = 'http://localhost:3000/api/logs'

const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG']

const messages = {
  INFO: [
    'User logged in successfully',
    'Password changed successfully',
    'New user registered',
    'Email verification sent',
    'Session started for user',
    'Profile updated successfully',
  ],
  WARN: [
    'API response took 3200ms',
    'Memory usage above 80%',
    'Retrying failed request',
    'Rate limit approaching threshold',
    'Disk space running low',
    'Slow database query detected',
  ],
  ERROR: [
    'Database connection timed out',
    'Failed to send email',
    'Payment processing failed',
    'Unhandled exception in worker',
    'JWT token verification failed',
    'File upload failed',
  ],
  DEBUG: [
    'Cache miss for user profile',
    'Query executed in 12ms',
    'Middleware chain completed',
    'Config loaded from environment',
    'WebSocket connection established',
    'Token refreshed successfully',
  ],
}

const sources = [
  'auth-service',
  'payment-service',
  'user-service',
  'email-service',
  'api-gateway',
]

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function sendLog(log) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(log)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }

    const url = new URL(API_URL)
    options.hostname = url.hostname
    options.port = url.port
    options.path = url.pathname

    const req = http.request(options, (res) => {
      res.on('data', () => {})
      res.on('end', () => resolve())
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function sendBatch(count) {
  console.log(`\nSending ${count} logs to ${API_URL}...\n`)

  for (let i = 0; i < count; i++) {
    const level = randomItem(levels)
    const log = {
      level,
      message: randomItem(messages[level]),
      source: randomItem(sources),
    }

    try {
      await sendLog(log)
      console.log(`✓ [${log.level}] ${log.message} — ${log.source}`)
    } catch (err) {
      console.error(`✗ Failed to send log: ${err.message}`)
    }
  }

  console.log('\nDone! Check your dashboard.')
}

sendBatch(20)