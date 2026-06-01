/**
 * Run once to get your Spotify refresh token.
 * Usage:
 *   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx node scripts/get-spotify-token.mjs
 *
 * Then paste the printed refresh token into your .env file.
 */

import http from 'http'
import { exec } from 'child_process'
import { URLSearchParams } from 'url'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:5174/callback'
const SCOPE = 'user-top-read user-read-recently-played'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars first.')
  process.exit(1)
}

const authUrl =
  `https://accounts.spotify.com/authorize?` +
  new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
  })

// Start a temporary local server to catch the OAuth callback
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:5174')
  if (url.pathname !== '/callback') return

  const code = url.searchParams.get('code')
  if (!code) {
    res.end('No code received.')
    return
  }

  // Exchange code for tokens
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  const tokens = await tokenRes.json()

  res.end('Got it! Check your terminal for the refresh token.')
  server.close()

  console.log('\n✅ Add these to your .env:\n')
  console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`)
  console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`)
  console.log(`SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}`)
})

server.listen(5174, () => {
  console.log('Opening Spotify login…')
  exec(`open "${authUrl}"`)
})
