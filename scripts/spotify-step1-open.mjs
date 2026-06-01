/**
 * Step 1 — opens the Spotify auth page in your browser.
 * Usage:
 *   SPOTIFY_CLIENT_ID=xxx node scripts/spotify-step1-open.mjs
 *
 * After logging in, Spotify will redirect you to example.com — the page
 * won't load, but copy the FULL URL from your browser's address bar
 * and pass the `code` query param to step 2.
 */

import { exec } from 'child_process'
import { URLSearchParams } from 'url'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = 'https://example.com/callback'
const SCOPE = 'user-top-read user-read-recently-played'

if (!CLIENT_ID) {
  console.error('Set SPOTIFY_CLIENT_ID first.')
  process.exit(1)
}

const url =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({ response_type: 'code', client_id: CLIENT_ID, scope: SCOPE, redirect_uri: REDIRECT_URI })

console.log('\nOpening Spotify login in your browser…')
console.log('\nAfter you log in, Spotify redirects you to example.com.')
console.log('The page won\'t load — that\'s fine.')
console.log('Copy the full URL from your address bar and look for:')
console.log('  https://example.com/callback?code=XXXXXX...')
console.log('\nThen run:')
console.log('  SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx node scripts/spotify-step2-exchange.mjs YOUR_CODE\n')

exec(`open "${url}"`)
