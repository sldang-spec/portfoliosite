import { useEffect, useState } from 'react'
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
      // Darken so white text stays legible
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

  useEffect(() => {
    fetch('/api/spotify')
      .then(r => r.json())
      .then(data => {
        const items = (data.items ?? []).map(i => i.track ?? i)
        setTracks(items)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const track  = tracks[index] ?? null
  const imgBig = track?.album?.images?.[0]?.url
  const imgSm  = track?.album?.images?.[2]?.url ?? imgBig

  useEffect(() => {
    if (!imgSm) return
    extractColor(imgSm).then(setBgColor)
  }, [imgSm])

  const prev = () => setIndex(i => (i - 1 + tracks.length) % tracks.length)
  const next = () => setIndex(i => (i + 1) % tracks.length)

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

        <div className="now-playing__spotify-mark">
          <SpotifyIcon size={26} />
        </div>

        <button className="now-playing__btn" onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
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
