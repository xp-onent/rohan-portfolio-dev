import React from 'react'

const HeroText = ({ text, colorClass }) => {
  return (
    <div className={`rgb-text font-black absolute inset-x-0 transform -translate-y-[31%] text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none font-[OvercameDemo] pointer-events-none mix-blend-screen uppercase ${colorClass}`}>{text}</div>
  )
}

export default HeroText