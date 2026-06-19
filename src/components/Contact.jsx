import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const cookRefs = useRef([]);
    const linksRef = useRef(null);
    const climaxRef = useRef(null);

    const paragraph = "You have the footage. You have the vision. Give me the ingredients, and...";
    const words = paragraph.split(' ');

    const socials = [
        { name: "Instagram", icon: <Instagram size={20} />, href: "#" },
        { name: "Email", icon: <Mail size={20} />, href: "#" },
        { name: "LinkedIn", icon: <Linkedin size={20} />, href: "#" }
    ];

    useEffect(() => {
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            const { isMobile } = context.conditions;
            const wordElements = textRef.current.querySelectorAll('.reveal-word');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=250%",
                    pin: true,
                    scrub: 1,
                }
            });

            // PHASE 1: Reveal the paragraph word by word
            tl.to(wordElements, {
                opacity: 1,
                stagger: 0.1,
                ease: "none"
            });

            // PHASE 2: Shrink and park the paragraph at the top
            // DEFINITIVE FIX: Move it completely off-screen and fade to zero on mobile
            tl.to(textRef.current, {
                scale: isMobile ? 0.3 : 0.45,
                y: isMobile ? -450 : -180,
                autoAlpha: isMobile ? 0 : 0.5,
                duration: 1,
                ease: "power2.inOut"
            }, "+=0.5");

            // PHASE 3: Drop in "LET ME COOK"
            tl.to(climaxRef.current, { opacity: 1, duration: 0.1 }, "<");

            tl.fromTo(cookRefs.current,
                {
                    y: isMobile ? -100 : -150,
                    scale: isMobile ? 2 : 3,
                    rotationX: 45,
                    opacity: 0,
                    filter: "blur(20px)"
                },
                {
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 2,
                    stagger: 0.5,
                    ease: "power4.out"
                }
            );

            // PHASE 4: Fade in the Social Links
            tl.fromTo(linksRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
            );

            return () => { };
        });

        return () => mm.revert();
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="relative w-full bg-transparent h-screen overflow-hidden">

            {/* The Build-Up: Overlapping Reading Section */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-24 z-10 pointer-events-none origin-center">
                <h2 ref={textRef} className="text-4xl md:text-7xl lg:text-8xl font-semibold uppercase tracking-tighter leading-[0.9] max-w-6xl text-center origin-center">
                    {words.map((word, i) => (
                        <span key={i} className="reveal-word inline-block mr-[2vw] opacity-20 transition-opacity duration-300">
                            {word}
                        </span>
                    ))}
                </h2>
            </div>

            {/* The Climax: Overlapping Contact Section (Hidden Initially) */}
            <div ref={climaxRef} className="absolute inset-0 flex flex-col items-center justify-center md:justify-end pb-12 md:pb-24 p-8 z-20 opacity-0 pointer-events-none">

                <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center justify-center mix-blend-difference mb-12 md:mb-24">
                    {["LET", "ME", "COOK"].map((word, i) => (
                        <h1
                            key={i}
                            ref={el => cookRefs.current[i] = el}
                            className="text-[16vw] md:text-[12vw] leading-none font-overcame font-black uppercase text-[#ccff00] tracking-tighter drop-shadow-[0_0_50px_rgba(204,255,0,0.3)] pointer-events-auto"
                        >
                            {word}
                        </h1>
                    ))}
                </div>

                {/* The Catharsis: Social Links */}
                <div ref={linksRef} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs md:text-sm tracking-[0.2em] text-white uppercase pointer-events-auto">
                    {socials.map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            className="group relative flex items-center justify-center gap-4 py-6 px-8 border border-white/10 bg-white/5 rounded-xl overflow-hidden transition-colors duration-500 hover:border-[#ccff00]"
                        >
                            {/* Hover Fill */}
                            <div className="absolute inset-0 bg-[#ccff00] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>

                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-black">
                                {social.icon}
                                <span>{social.name}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Contact;
