import { useState, useEffect } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const MIN_LOAD_TIME = 3000 // 3 seconds for gif to play fully
    let startTime = Date.now()
    let pageHasLoaded = false

    // Update progress bar over the minimum load time
    let progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / MIN_LOAD_TIME) * 100, 100)
      setProgress(newProgress)
    }, 50)

    // Mark when page fully loads
    const onPageLoad = () => {
      pageHasLoaded = true
    }

    // Hide loading screen once both conditions are met
    const checkCanHide = () => {
      const elapsed = Date.now() - startTime
      if (pageHasLoaded && elapsed >= MIN_LOAD_TIME) {
        setProgress(100)
        clearInterval(progressInterval)
        window.removeEventListener('load', onPageLoad)
        // Start fade out animation
        setIsFadingOut(true)
        // Unmount after fade out completes
        setTimeout(() => setIsLoading(false), 500)
      }
    }

    window.addEventListener('load', onPageLoad)

    // Check every 100ms if we can hide
    let hideCheckInterval = setInterval(checkCanHide, 100)

    return () => {
      clearInterval(progressInterval)
      clearInterval(hideCheckInterval)
      window.removeEventListener('load', onPageLoad)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className={`loading-screen ${isFadingOut ? 'loading-screen--fade-out' : ''}`}>
      <img src="/img/loading.gif" alt="Loading" className="loading-screen__gif" />
      <div className="loading-screen__bar-container">
        <div className="loading-screen__bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}
