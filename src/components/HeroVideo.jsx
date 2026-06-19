import React, { useRef } from 'react'
import gsap from 'gsap'

const HeroVideo = ({ src }) => {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    // Only animate Scale, Z-index, and Brightness here. 
    // Do NOT touch rotationX or rotationY here!
    gsap.to(cardRef.current, {
      z: 100,
      scale: 1.1,
      filter: "brightness(1)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto" // This kills any conflicting animations on these specific properties
    });

    gsap.to(".video-card", {
      filter: (i, target) => target === cardRef.current ? "brightness(1)" : "brightness(0.2)",
      scale: (i, target) => target === cardRef.current ? 1.1 : 0.95,
      duration: 0.4,
    });
  }

  const handleMouseLeave = () => {
    gsap.to(".video-card", {
      z: 0,
      scale: 1,
      filter: "brightness(0.5)",
      duration: 0.5,
      ease: "power2.inOut"
    });
  }

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='video-card h-full aspect-9/11 bg-[#151515] flex justify-center items-center text-6xl rounded-xl overflow-hidden text-[#333] border border-white/5 cursor-pointer md:relative absolute'
      style={{ filter: "brightness(0.4)" }}
    >
        <video 
          src={src}
          autoPlay 
          muted 
          loop 
          playsInline
          className='w-full h-full object-cover'
        />
    </div>
  )
}

export default HeroVideo