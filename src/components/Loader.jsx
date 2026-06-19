import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loader = ({ isLoaded, onFinish }) => {
  const [counter, setCounter] = useState(0);

  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const intervalRef = useRef(null);

  // Phase 1 — fake loading (0 → 90)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Phase 2 — when real loading finishes
  useEffect(() => {
    if (!isLoaded) return;

    clearInterval(intervalRef.current);

    // 👇 THIS is the missing piece
    const progress = { value: counter };

    gsap.to(progress, {
      value: 100,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        setCounter(Math.round(progress.value));
      },
      onComplete: () => {
        // Exit animation AFTER counter finishes
        const tl = gsap.timeline({
          onComplete: onFinish,
        });

        tl.to(counterRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        }).to(
          loaderRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.2,
            ease: "expo.inOut",
          },
          "-=0.4"
        );
      },
    });

    return () => gsap.killTweensOf(progress);
  }, [isLoaded]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-[#dadada] flex flex-col items-center justify-center text-[#0a0a0a]"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="absolute top-10 left-10">
        <p className="text-[10px] tracking-[0.3em] opacity-40 uppercase">
          ROHAN PANT // 2026
        </p>
      </div>

      <div ref={counterRef}>
        <h1 className="text-[15vw] font-light leading-none">
          {counter}
          <span className="text-[5vw] opacity-20">%</span>
        </h1>
      </div>

      <div className="absolute bottom-10 right-10 flex items-center gap-4">
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">
          {isLoaded ? "System Ready" : "Initializing Assets"}
        </p>
        <div className="w-12 h-px bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#0a0a0a] transition-all duration-300"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;