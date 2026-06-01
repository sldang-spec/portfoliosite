import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Works from './pages/Works'
import About from './pages/About'
import XRMural from './pages/case-studies/XRMural'
import ClashXR from './pages/case-studies/ClashXR'
import DID from './pages/case-studies/DID'
import NikeFC from './pages/case-studies/NikeFC'
import SnapGTM from './pages/case-studies/SnapGTM'

import './styles/global.css'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Always scroll to top on any navigation
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <BrowserRouter>
      <LoadingScreen />
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Works />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/xr-mural" element={<XRMural />} />
        <Route path="/work/clash-xr" element={<ClashXR />} />
        <Route path="/work/did" element={<DID />} />
        <Route path="/work/nike-fc" element={<NikeFC />} />
        <Route path="/work/snap-gtm" element={<SnapGTM />} />
      </Routes>
    </BrowserRouter>
  )
}
