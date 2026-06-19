import React, { forwardRef } from "react";

const CinematicText = forwardRef(({ text }, ref) => {
  const words = text.split(" ");

  return (
    <div ref={ref} className="w-full">
      <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-[0.9] tracking-tighter whitespace-normal">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-4">
            {word.split("").map((char, charIndex) => (
              <span key={charIndex} className="reveal-char inline-block opacity-0 translate-y-4">
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>
    </div>
  );
});

export default CinematicText;