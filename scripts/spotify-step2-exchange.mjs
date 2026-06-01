/**
 * Step 2 — exchanges the auth code for a refresh token.
 *
 * Usage (paste your values directly as arguments):
 *   node scripts/spotify-step2-exchange.mjs CLIENT_ID CLIENT_SECRET CODE
 */

const CLIENT_ID     = process.argv[2]
const CLIENT_SECRET = process.argv[3]
const code          = process.argv[4]
const REDIRECT_URI  = 'https://example.com/callback'

if (!CLIENT_ID || !CLIENT_SECRET || !code) {
  console.error('\nUsage:\n  node scripts/spotify-step2-exchange.mjs CLIENT_ID CLIENT_SECRET CODE\n')
  process.exit(1)
}

const res = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
  },
  body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
})

const data = await res.json()

if (!data.refresh_token) {
  console.error('Something went wrong:', JSON.stringify(data, null, 2))
  process.exit(1)
}

console.log('\n✅ Add these to your .env file:\n')
console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`)
console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`)
console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`)
