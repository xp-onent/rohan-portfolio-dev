import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mediaItems = [
  { type: 'image', src: '/rohan-image.png' },
  { type: 'video', src: '/about-vid1.mp4' },
  { type: 'video', src: '/about-vid2.mp4' },
  { type: 'video', src: '/about-vid3.mp4' },
];

const texts = [
  { title: "Visual\nRhythm", desc: "Crafting narratives through precise timing and seamless cuts. I don't just cut footage, I craft stories that demand attention." },
  { title: "Motion\nDesign", desc: "Elevating stories with dynamic graphics and kinetic typography. Precision editing meets chaotic creativity." },
  { title: "Color\nGrading", desc: "Painting emotions and atmosphere with cinematic color palettes. Every cut has a distinct purpose." },
  { title: "Sound\nScapes", desc: "Immersing audiences through meticulously layered audio design. The heartbeat of every premium edit." }
];

import { useGSAP } from '@gsap/react';

const About = () => {
  const containerRef = useRef(null);
  const mediaContainerRef = useRef(null);
  const mediaRefs = useRef([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // DESKTOP: Vertical Pinning & Sliding
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: mediaContainerRef.current,
        scrub: true,
      });

      mediaRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { yPercent: i === 0 ? 0 : 102, autoAlpha: 1 });
        if (el.tagName === 'VIDEO') {
          el.muted = true;
          el.play().catch(() => {});
        }
      });

      const textBlocks = gsap.utils.toArray('.text-block');
      textBlocks.forEach((block, i) => {
        const title = block.querySelector('.about-title');
        const desc = block.querySelector('.about-desc');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
          }
        });

        gsap.set([title, desc], { opacity: 0, y: 50 });
        tl.to([title, desc], { opacity: 1, y: 0, ease: "power2.out", duration: 0.4 })
          .to(desc, { y: -40, ease: "none", duration: 0.6 }, ">");

        if (i === 0) return;
        if (mediaRefs.current[i]) {
          gsap.to(mediaRefs.current[i], {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "center center",
              scrub: true,
            }
          });
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // MOBILE: Simple Text Reveals
      const textBlocks = gsap.utils.toArray('.text-block');
      textBlocks.forEach((block) => {
        const title = block.querySelector('.about-title');
        const desc = block.querySelector('.about-desc');
        const video = block.querySelector('.mobile-video-wrapper');

        gsap.set([title, desc, video], { opacity: 0, y: 30 });
        gsap.to([title, desc, video], {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: block,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          }
        });
      });
    });

    setTimeout(() => { ScrollTrigger.refresh(); }, 100);
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="relative w-full text-white z-10 md:bg-transparent overflow-hidden px-6 md:px-0">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 lg:gap-32 w-full max-w-[100rem] mx-auto relative md:px-10 lg:px-20">
        {/* SCROLLING CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col relative z-20">
          <div className="pt-20 md:pt-[20vh] pb-20 md:pb-[20vh]">
            {texts.map((item, index) => (
              <div key={index} className="text-block mb-24 md:mb-0 md:h-screen flex flex-col justify-center items-start text-left w-full">

                {/* Mobile Alternating Layout (Hidden on Desktop) */}
                <div className={`md:hidden w-full flex flex-col mb-12 ${index % 2 === 0 ? '' : 'items-end'}`}>
                  <div className={`flex items-center gap-4 mb-4 w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'}`}>
                    {/* TEXT BLOCK (Title + Description) */}

                    <div className="flex flex-col flex-1">

                      <h2 className="about-title text-4xl font-bold uppercase tracking-tight text-white leading-[0.9]">

                        {item.title}

                      </h2>

                      <p className={`about-desc text-base font-light text-zinc-400 leading-relaxed mt-3 ${index % 2 === 0 ? 'text-left' : 'text-right'

                        }`}>

                        {item.desc}

                      </p>

                    </div>

                    {/* Media (Image or Video) */}
                    <div className="mobile-video-wrapper w-1/2 aspect-[4/5] rounded-sm overflow-hidden bg-zinc-900 border border-white/5 shadow-xl">
                      {mediaItems[index]?.type === 'image' ? (
                        <img
                          src={mediaItems[index].src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={mediaItems[index]?.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop Titles (Hidden on Mobile) */}
                <div className="hidden md:block">
                  <h2 className="about-title text-5xl md:text-[min(6vw,7rem)] font-bold uppercase tracking-tighter text-white leading-[0.9] drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] mb-6 whitespace-pre-line block">
                    {item.title}
                  </h2>
                  <p className="about-desc text-lg md:text-3xl font-light text-zinc-300 max-w-md leading-[1.2] tracking-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PINNED MEDIA (Desktop only) */}
        <div className="hidden md:block w-full md:w-1/2 relative h-screen">
          <div
            ref={mediaContainerRef}
            className="w-full h-screen flex items-center justify-center top-0 relative"
          >
            <div className="relative w-full aspect-[4/5] bg-zinc-900 rounded-sm overflow-hidden border border-white/5 shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)] transform-gpu">
              {mediaItems.map((item, idx) => {
                if (item.type === 'image') {
                  return (
                    <img
                      key={idx}
                      ref={el => mediaRefs.current[idx] = el}
                      src={item.src}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover origin-center transform-gpu"
                      style={{ zIndex: idx }}
                    />
                  );
                }
                return (
                  <video
                    key={idx}
                    ref={el => mediaRefs.current[idx] = el}
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover origin-center transform-gpu"
                    style={{ zIndex: idx }}
                  />
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;