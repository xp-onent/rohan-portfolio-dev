import { ReactLenis } from 'lenis/react'
import Hero from './components/Hero'
import PinnedSection from './components/PinnedSection'
import Footer from './components/Footer'

function App() {
  return (
    <ReactLenis root>
      <main className="bg-black text-[#E2E8F0] min-h-screen font-sans selection:bg-[#E2FB6C] selection:text-black">
        <Hero />
        <PinnedSection />
        <Footer />
      </main>
    </ReactLenis>
  )
}

export default App
