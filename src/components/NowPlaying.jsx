import { useEffect, useState, useRef } from 'react'
import './NowPlaying.css'

function extractColor(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const size = 60
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, size, size)
      const { data } = ctx.getImageData(0, 0, size, size)
      let r = 0, g = 0, b = 0, n = 0
      for (let i = 0; i < data.length; i += 4) {
        r += data[i]; g += data[i + 1]; b += data[i + 2]; n++
      }
      const s = 0.45
      resolve(`rgb(${Math.round(r / n * s)},${Math.round(g / n * s)},${Math.round(b / n * s)})`)
    }
    img.onerror = () => resolve('#1a1a1a')
    img.src = url
  })
}

export default function NowPlaying() {
  const [tracks, setTracks]   = useState([])
  const [index, setIndex]     = useState(0)
  const [bgColor, setBgColor] = useState('#1a1a1a')
  const [loading, setLoading] = useState(true)
  const [accessToken, setAccessToken] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const playerRef = useRef(null)
  const deviceIdRef = useRef(null)

  useEffect(() => {
    // Load Spotify Web Playback SDK
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      fetch('/api/spotify')
        .then(r => r.json())
        .then(data => {
          const items = (data.items ?? []).map(i => i.track ?? i)
          setTracks(items)
          setAccessToken(data.access_token)

          if (data.access_token) {
            const player = new window.Spotify.Player({
              name: 'Portfolio Player',
              getOAuthToken: cb => cb(data.access_token),
              volume: 0.5,
            })

            player.addListener('player_ready', ({ device_id }) => {
              deviceIdRef.current = device_id
            })

            player.addListener('player_state_changed', (state) => {
              if (state) {
                setIsPlaying(!state.paused)
              }
            })

            playerRef.current = player
            player.connect()
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect()
      }
    }
  }, [])

  const track = tracks[index] ?? null
  const imgBig = track?.album?.images?.[0]?.url
  const imgSm = track?.album?.images?.[2]?.url ?? imgBig

  useEffect(() => {
    if (!imgSm) return
    extractColor(imgSm).then(setBgColor)
  }, [imgSm])

  const prev = () => setIndex(i => (i - 1 + tracks.length) % tracks.length)
  const next = () => setIndex(i => (i + 1) % tracks.length)

  const playTrack = () => {
    if (playerRef.current && deviceIdRef.current && track?.uri) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceIdRef.current}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ uris: [track.uri] }),
      }).catch(() => {})
    }
  }

  const togglePlayPause = () => {
    if (playerRef.current) {
      playerRef.current.togglePlay()
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume / 100)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (playerRef.current) {
      playerRef.current.setVolume(isMuted ? volume / 100 : 0)
    }
  }

  if (loading) {
    return (
      <div className="now-playing" style={{ backgroundColor: '#1e1e1e' }}>
        <p className="now-playing__label">Now Playing</p>
        <div className="now-playing__art-skeleton" />
        <div className="now-playing__text-skeleton" />
      </div>
    )
  }

  if (!track) {
    return (
      <div className="now-playing" style={{ backgroundColor: '#1e1e1e' }}>
        <p className="now-playing__label">Now Playing</p>
        <div className="now-playing__empty">
          <SpotifyIcon size={32} />
          <p>Available on deployed site</p>
        </div>
      </div>
    )
  }

  return (
    <div className="now-playing" style={{ backgroundColor: bgColor, transition: 'background-color 0.8s ease' }}>
      <p className="now-playing__label">Now Playing</p>

      <div className="now-playing__art-wrap">
        {imgBig && (
          <img src={imgBig} alt={track.name} className="now-playing__art" />
        )}
      </div>

      <div className="now-playing__meta">
        <p className="now-playing__track">{track.name}</p>
        <p className="now-playing__artist">{track.artists?.map(a => a.name).join(', ')}</p>
      </div>

      <div className="now-playing__controls">
        <button className="now-playing__btn" onClick={prev} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <button className="now-playing__btn now-playing__btn--play" onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button className="now-playing__btn" onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      <div className="now-playing__volume">
        <button className="now-playing__mute-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
              <path d="M16.5 12c0-1.77-1.02-3.3-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C23.16 15.14 24 13.6 24 12c0-4.28-2.99-7.86-7-8.77v2.06c1.85.63 3.37 1.91 4.49 3.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.3-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="now-playing__volume-slider"
          aria-label="Volume"
        />
      </div>
    </div>
  )
}

function SpotifyIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" width={size} height={size}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}
