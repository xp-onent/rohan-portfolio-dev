import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const mediaItems = [
    { type: 'image', src: '/rohan-image.png' },
    { type: 'video', src: '/about-vid1.mp4' },
    { type: 'video', src: '/about-vid2.mp4' },
    { type: 'video', src: '/about-vid3.mp4' },
];

const texts = [
    {
        title: 'Visual\nRhythm',
        desc: "Crafting narratives through precise timing and seamless cuts. I don't just cut footage, I craft stories that demand attention.",
    },
    {
        title: 'Motion\nDesign',
        desc: 'Elevating stories with dynamic graphics and kinetic typography. Precision editing meets chaotic creativity.',
    },
    {
        title: 'Color\nGrading',
        desc: 'Painting emotions and atmosphere with cinematic color palettes. Every cut has a distinct purpose.',
    },
    {
        title: 'Sound\nScapes',
        desc: 'Immersing audiences through meticulously layered audio design. The heartbeat of every premium edit.',
    },
];

const AboutDesktop = () => {
    const containerRef = useRef(null);
    const mediaContainerRef = useRef(null);
    const mediaRefs = useRef([]);

    useGSAP(
        () => {
            const media = mediaRefs.current.filter(Boolean);
            const textBlocks = gsap.utils.toArray('.text-block');

            media.forEach((el) => {
                if (el.tagName === 'VIDEO') {
                    el.muted = true;
                    el.play().catch(() => { });
                }
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                pin: mediaContainerRef.current,
                scrub: true,
            });

            media.forEach((el, index) => {
                gsap.set(el, {
                    yPercent: index === 0 ? 0 : 102,
                    autoAlpha: 1,
                    scale: 1,
                });
            });

            textBlocks.forEach((block, index) => {
                const title = block.querySelector('.about-title');
                const desc = block.querySelector('.about-desc');

                gsap.set([title, desc], { opacity: 0, y: 50 });

                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 80%',
                            end: 'bottom top',
                            scrub: true,
                        },
                    })
                    .to([title, desc], {
                        opacity: 1,
                        y: 0,
                        ease: 'power2.out',
                        duration: 0.4,
                    })
                    .to(
                        desc,
                        {
                            y: -40,
                            ease: 'none',
                            duration: 0.6,
                        },
                        '>',
                    );

                if (index === 0 || !media[index]) {
                    return;
                }

                gsap.to(media[index], {
                    yPercent: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: true,
                    },
                });
            });

            const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

            return () => {
                cancelAnimationFrame(refreshId);
            };
        },
        { scope: containerRef },
    );

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative z-10 w-full overflow-hidden bg-black text-white md:bg-transparent"
        >
            <div className="relative mx-auto flex w-full max-w-[100rem] flex-col gap-10 px-6 md:flex-row md:gap-20 md:px-10 lg:gap-32 lg:px-20">
                <div className="relative z-20 flex w-full flex-col md:w-1/2">
                    <div className="pt-[12vh] pb-[12vh] md:pt-[20vh] md:pb-[20vh]">
                        {texts.map((item) => (
                            <div
                                key={item.title}
                                className="text-block flex h-[88vh] min-h-[42rem] flex-col items-start justify-center text-left md:h-screen md:min-h-0"
                            >
                                <h2 className="about-title mb-6 block whitespace-pre-line font-serif text-5xl italic leading-[0.9] text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] md:text-[min(6vw,7rem)]">
                                    {item.title}
                                </h2>
                                <p className="about-desc max-w-md text-lg leading-[1.2] tracking-tight text-zinc-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:text-3xl md:font-light md:text-zinc-300">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative hidden w-1/2 md:block md:h-auto">
                    <div
                        ref={mediaContainerRef}
                        className="relative flex h-screen items-center justify-center"
                    >
                        <div className="relative aspect-[4/5] h-auto w-full overflow-hidden rounded-sm border border-white/5 bg-zinc-900 shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)] transform-gpu">
                            {mediaItems.map((item, index) => {
                                if (item.type === 'image') {
                                    return (
                                        <img
                                            key={`desktop-image-${index}`}
                                            ref={(element) => {
                                                mediaRefs.current[index] = element;
                                            }}
                                            src={item.src}
                                            alt=""
                                            className="absolute inset-0 h-full w-full object-cover transform-gpu will-change-transform"
                                            style={{ zIndex: index + 1 }}
                                        />
                                    );
                                }
                                return (
                                    <video
                                        key={`desktop-video-${index}`}
                                        ref={(element) => {
                                            mediaRefs.current[index] = element;
                                        }}
                                        src={item.src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                        className="absolute inset-0 h-full w-full object-cover transform-gpu will-change-transform"
                                        style={{ zIndex: index + 1 }}
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

const AboutMobile = () => {
    const containerRef = useRef(null);
    const mediaRefs = useRef([]);

    useGSAP(
        () => {
            const media = mediaRefs.current.filter(Boolean);
            const textBlocks = gsap.utils.toArray('.mobile-text-block');

            const showVideo = (activeIndex) => {
                media.forEach((el, index) => {
                    gsap.to(el, {
                        autoAlpha: index === activeIndex ? 1 : 0,
                        duration: 0.5,
                        ease: 'power2.out',
                        overwrite: true,
                    });
                });
            };

            media.forEach((el, index) => {
                if (el.tagName === 'VIDEO') {
                    el.muted = true;
                    el.load();
                    el.play().catch(() => { });
                }

                gsap.set(el, {
                    autoAlpha: index === 0 ? 1 : 0,
                    scale: 1.05,
                });
            });

            textBlocks.forEach((block, index) => {
                const title = block.querySelector('.about-title');
                const desc = block.querySelector('.about-desc');

                gsap.set([title, desc], { autoAlpha: 0, y: 36 });

                gsap.to([title, desc], {
                    autoAlpha: 1,
                    y: 0,
                    ease: 'power2.out',
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 78%',
                        end: 'top 42%',
                        scrub: true,
                    },
                });

                ScrollTrigger.create({
                    trigger: block,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => showVideo(index),
                    onEnterBack: () => showVideo(index),
                });
            });

            showVideo(0);

            const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

            return () => {
                cancelAnimationFrame(refreshId);
            };
        },
        { scope: containerRef },
    );

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative z-10 w-full overflow-hidden bg-black text-white md:hidden"
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="sticky top-0 h-screen overflow-hidden">
                    {mediaItems.map((item, index) => {
                        if (item.type === 'image') {
                            return (
                                <img
                                    key={`mobile-image-${index}`}
                                    ref={(element) => {
                                        mediaRefs.current[index] = element;
                                    }}
                                    src={item.src}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover transform-gpu will-change-[opacity,transform]"
                                    style={{ zIndex: index + 1 }}
                                />
                            );
                        }
                        return (
                            <video
                                key={`mobile-video-${index}`}
                                ref={(element) => {
                                    mediaRefs.current[index] = element;
                                }}
                                src={item.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="absolute inset-0 h-full w-full object-cover transform-gpu will-change-[opacity,transform]"
                                style={{ zIndex: index + 1 }}
                            />
                        );
                    })}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />
                </div>
            </div>

            <div className="relative z-20 px-6">
                <div className="pt-[10vh] pb-[10vh]">
                    {texts.map((item) => (
                        <div
                            key={item.title}
                            className="mobile-text-block flex min-h-screen flex-col items-start justify-center text-left"
                        >
                            <h2 className="about-title mb-6 whitespace-pre-line font-serif text-5xl italic leading-[0.9] text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.65)]">
                                {item.title}
                            </h2>
                            <p className="about-desc max-w-sm text-lg leading-[1.25] tracking-tight text-zinc-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const About = () => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        return window.innerWidth < 768;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');

        const updateViewport = (event) => {
            setIsMobile(event.matches);
        };

        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', updateViewport);

        return () => {
            mediaQuery.removeEventListener('change', updateViewport);
        };
    }, []);

    return isMobile ? <AboutMobile /> : <AboutDesktop />;
};

export default About;
