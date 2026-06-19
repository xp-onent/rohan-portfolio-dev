import React, { useState } from 'react'

const EditorHUD = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Focus only on stats and achievements as requested
  // A SINGLE space at the very end. This is the only gap control we use.
  const marqueeText = "SCALED CREATORS TO 100K+ FOLLOWERS • 2M+ VIEWS GENERATED • OVER 100+ PIECES OF PREMIUM CONTENT PRODUCED • PROVEN RETENTION STRATEGIST • ";

  return (
    <>
      {/* Top HUD elements - Keep pointer events none so it doesn't block interactions */}
      <div className="absolute inset-0 p-6 md:p-8 z-50 pointer-events-none flex flex-col justify-between font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40">
        <div className="flex justify-end items-start w-full">
          {/* Live timer removed as per request */}
        </div>
      </div>

      {/* Bottom Marquee Element - Allow pointer events for the hover pause effect */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/10 bg-black/20 backdrop-blur-sm z-50 py-3 md:py-4 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The parent container handles the exact animation cycle */}
        <div
          className="flex w-fit animate-marquee transition-none"
          style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
        >

          {/* First Track - NO GAP OR PADDING, rely entirely on the string's trailing space */}
          <div className="flex whitespace-pre shrink-0">
            {[...Array(4)].map((_, i) => (
              <span key={`first-${i}`} className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] text-white/60 shrink-0">
                {marqueeText}
              </span>
            ))}
          </div>

          {/* Second Track (Seamless loop) */}
          <div className="flex whitespace-pre shrink-0">
            {[...Array(4)].map((_, i) => (
              <span key={`second-${i}`} className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] text-white/60 shrink-0">
                {marqueeText}
              </span>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default EditorHUD