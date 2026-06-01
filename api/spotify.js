// Vercel serverless function — /api/spotify
// Returns the user's top tracks (medium_term) via the Spotify API.
// Requires three env vars: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return res.status(500).json({ error: 'Missing Spotify env vars' })
  }

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  })

  const { access_token } = await tokenRes.json()
  if (!access_token) return res.status(401).json({ error: 'Could not refresh Spotify token' })

  const tracksRes = await fetch(
    'https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=medium_term',
    { headers: { Authorization: `Bearer ${access_token}` } }
  )

  const data = await tracksRes.json()
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  return res.status(200).json(data)
}
