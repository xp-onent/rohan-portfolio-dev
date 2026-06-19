import React, { useRef } from 'react'
import HeroText from './HeroText'
import HeroVideo from './HeroVideo'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import EditorHUD from './EditorHUD'

const Hero = () => {
  const container = useRef()

  const xToText = useRef([])
  const yToText = useRef([])

  const subtitleRef = useRef()
  const xToSubtitle = useRef()
  const yToSubtitle = useRef()

  const xToVideo = useRef()
  const yToVideo = useRef()
  const tiltXVideo = useRef()
  const tiltYVideo = useRef()

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop logic
      const layers = gsap.utils.toArray('.rgb-text')

      layers.forEach((layer, i) => {
        xToText.current[i] = gsap.quickTo(layer, "x", {
          duration: 0.3 + i * 0.1,
          ease: "power3"
        })
        yToText.current[i] = gsap.quickTo(layer, "y", {
          duration: 0.3 + i * 0.1,
          ease: "power3"
        })
      })

      xToSubtitle.current = gsap.quickTo(subtitleRef.current, "x", {
        duration: 0.6,
        ease: "power3"
      })
      yToSubtitle.current = gsap.quickTo(subtitleRef.current, "y", {
        duration: 0.6,
        ease: "power3"
      })

      xToVideo.current = gsap.quickTo(".video-wrapper", "x", { duration: 0.8, ease: "power3" })
      yToVideo.current = gsap.quickTo(".video-wrapper", "y", { duration: 0.8, ease: "power3" })
      tiltXVideo.current = gsap.quickTo(".video-wrapper", "rotationX", { duration: 0.8, ease: "power3" })
      tiltYVideo.current = gsap.quickTo(".video-wrapper", "rotationY", { duration: 0.8, ease: "power3" })
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile logic
      const layers = gsap.utils.toArray('.rgb-text')

      layers.forEach((layer, i) => {
        xToText.current[i] = gsap.quickTo(layer, "x", { duration: 0.3, ease: "power3" })
        yToText.current[i] = gsap.quickTo(layer, "y", { duration: 0.3, ease: "power3" })
      })

      xToSubtitle.current = gsap.quickTo(subtitleRef.current, "x", { duration: 0.6, ease: "power3" })
      yToSubtitle.current = gsap.quickTo(subtitleRef.current, "y", { duration: 0.6, ease: "power3" })

      // Define empty setters for video to prevent errors
      xToVideo.current = () => { }
      yToVideo.current = () => { }
      tiltXVideo.current = () => { }
      tiltYVideo.current = () => { }

      // Mobile Video Stack Animation
      const cards = gsap.utils.toArray('.video-card');

      // Initial state
      gsap.set(cards, {
        x: 0,
        y: 0,
        z: (i) => -i * 100,
        scale: (i) => 1 - (i * 0.1),
        filter: (i) => `brightness(${1 - (i * 0.3)})`,
        opacity: (i) => 1 - (i * 0.2)
      });

      let currentIndex = 0;

      const animateStack = () => {
        const nextIndex = (currentIndex + 1) % cards.length;
        const lastIndex = (currentIndex + 2) % cards.length;

        const tl = gsap.timeline({
          defaults: { duration: 1.2, ease: "expo.inOut" }
        });

        // Current card moves out and goes to back
        tl.to(cards[currentIndex], {
          z: -200,
          scale: 0.8,
          filter: "brightness(0.4)",
          opacity: 0.6,
          y: 20, // subtle dip
        }, 0);

        // Next card comes to front
        tl.to(cards[nextIndex], {
          z: 0,
          scale: 1,
          filter: "brightness(1)",
          opacity: 1,
          y: 0,
        }, 0);

        // Last card moves to middle
        tl.to(cards[lastIndex], {
          z: -100,
          scale: 0.9,
          filter: "brightness(0.7)",
          opacity: 0.8,
          y: 10,
        }, 0);

        currentIndex = nextIndex;
      };

      const interval = setInterval(animateStack, 3000);
      return () => clearInterval(interval);
    });

  }, { scope: container })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const xPos = (clientX / window.innerWidth) - 0.5;
    const yPos = (clientY / window.innerHeight) - 0.5;

    // RGB text moves strongest
    xToText.current.forEach((setX, i) => {
      if (setX) setX(xPos * (80 + i * 20));
    })
    yToText.current.forEach((setY, i) => {
      if (setY) setY(yPos * (80 + i * 20));
    })

    // Subtitle moves distinctly
    if (xToSubtitle.current) xToSubtitle.current(xPos * 40);
    if (yToSubtitle.current) yToSubtitle.current(yPos * 40);

    // Videos move in reverse
    if (xToVideo.current) xToVideo.current(xPos * -100);
    if (yToVideo.current) yToVideo.current(yPos * -100);
    if (tiltXVideo.current) tiltXVideo.current(yPos * -40);
    if (tiltYVideo.current) tiltYVideo.current(xPos * 40);
  }

  return (
    <div id="hero" ref={container} onMouseMove={handleMouseMove} className='relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden'>

      <EditorHUD />

      <div className='video-wrapper absolute flex h-[50vh] md:h-[55vh] w-full justify-center items-center md:gap-6 z-0 transform-3d px-10'>
        <HeroVideo src='/hero-vid1.mp4' />
        <HeroVideo src='/hero-vid2.mp4' />
        <HeroVideo src='/hero-vid3.mp4' />
      </div>

      {/* Lifted the text wrapper up slightly to make room for subtitle, and forced no-wrap so it stays inline */}
      <div className='text-wrapper z-10 w-full whitespace-nowrap text-center relative -top-10 scale-75 md:scale-100'>
        <HeroText text={"ROHAN PANT"} colorClass='text-[#ff0000]' />
        <HeroText text={"ROHAN PANT"} colorClass='text-[#00ff00]' />
        <HeroText text={"ROHAN PANT"} colorClass='text-[#0000ff]' />
      </div>

      {/* The Floating Subtitle Pill */}
      <div
        ref={subtitleRef}
        className='absolute z-20 mt-64 md:mt-32 pointer-events-none px-4 w-full flex justify-center'
      >
        <div className='bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]'>
          <p className='font-mono text-[9px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase flex items-center justify-center text-center'>
            <span className='hidden sm:inline'>Full-time Premium Video Editor</span>
            <span className='sm:hidden'>Video Editor</span>
            <span className='mx-2 md:mx-3 opacity-50 relative -top-[1px]'>|</span>
            <span className='hidden md:inline'>Adobe After Effects <span className='mx-3 opacity-50 relative -top-[1px]'>|</span></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 relative -top-[1px]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            Haldwani, IN
          </p>
        </div>
      </div>

    </div>
  )
}

export default Hero