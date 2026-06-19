import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import About from './components/About'
import SelectedWorks from './components/SelectedWorks'
import Loader from './components/Loader'
import Contact from './components/Contact'
import Navbar from './components/Navbar'

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)


  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3), // smooth, natural ease-out
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: true,
      touchMultiplier: 1.2,
    })

    if (showLoader) {
      lenis.stop();
    } else {
      lenis.start();
    }

    let rafId

    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    const handleLoad = () => {
      // Small timeout ensures the transition isn't jarringly fast on fiber internet
      setTimeout(() => setIsLoaded(true), 1000);
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.removeEventListener('load', handleLoad)
    }
  }, [showLoader])

  return (
    <div className="bg-grid-global w-full min-h-screen text-white">
      <div className="noise-overlay" />
      <div className="vignette" />

      {showLoader && (
        <Loader
          isLoaded={isLoaded}
          onFinish={() => setShowLoader(false)}
        />
      )}

      <div
        className={`transition-opacity duration-700 ${showLoader ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <Navbar />
        <Hero startAnimation={isLoaded} />
        <About />
        <SelectedWorks />
        <Contact />
      </div>
    </div>
  )
}

export default App