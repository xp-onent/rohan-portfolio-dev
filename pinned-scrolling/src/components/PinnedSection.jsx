import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2670&auto=format&fit=crop"
];

const texts = [
    { title: "Visual Rhythm", desc: "Crafting narratives through precise timing and seamless cuts." },
    { title: "Motion Design", desc: "Elevating stories with dynamic graphics and kinetic typography." },
    { title: "Color Grading", desc: "Painting emotions and atmosphere with cinematic color palettes." },
    { title: "Soundscapes", desc: "Immersing audiences through meticulously layered audio design." }
];

export default function PinnedSection() {
    const containerRef = useRef(null);
    const leftRailRef = useRef(null);
    const rightRailRef = useRef(null);
    const imagesRef = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Pinning the right rail
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: rightRailRef.current,
                scrub: true,
            });

            // Initially position images out of view
            imagesRef.current.forEach((img, i) => {
                if (i !== 0) {
                    gsap.set(img, { yPercent: 100 });
                }
            });

            // Animate images and content
            const textBlocks = gsap.utils.toArray('.text-block');

            textBlocks.forEach((block, i) => {
                const title = block.querySelector('h2');
                const desc = block.querySelector('p');

                // Create a single scrubbed timeline for both the reveal and the differential scroll
                // This prevents them from fighting over the "y" transform property and causing jumps.
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: block,
                        start: "top 80%", // Start revealing a bit earlier
                        end: "bottom top", // Finish when block leaves viewport
                        scrub: true,
                    }
                });

                // Phase 1: Fade in and slide up to their natural positions 
                // We use y: 100 to y: 0 for the reveal.
                gsap.set([title, desc], { opacity: 0.2, y: 100 });

                tl.to([title, desc], {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.4 // Takes up first 40% of the scroll timeline
                })
                    // Phase 2: As it continues scrolling up and leaving the viewport,
                    // the description text moves upwards faster (negative y) to close the gap.
                    .to(desc, {
                        y: -60,
                        ease: "none",
                        duration: 0.6 // Takes up the remaining 60% of the timeline
                    }, ">"); // ">" means it starts immediately after the previous animation finishes

                // Image transitions
                if (i === 0) return; // First image is already visible

                // The wrapper slides up
                gsap.to(imagesRef.current[i], {
                    yPercent: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: block,
                        start: "top bottom",
                        end: "center center",
                        scrub: true,
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full flex flex-col md:flex-row bg-black">
            {/* Left Rail (Scrolling) */}
            <div ref={leftRailRef} className="w-full md:w-1/2 flex flex-col px-8 md:px-16 lg:px-24 relative z-10">
                {texts.map((item, index) => (
                    <div key={index} className="text-block h-screen flex flex-col justify-center items-start text-left">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white leading-tight">
                            {item.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-md leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Right Rail (Pinned) */}
            <div className="w-full md:w-1/2 relative h-screen hidden md:block">
                <div ref={rightRailRef} className="w-full h-full p-8 md:p-16 lg:p-24 flex items-center justify-center">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-black ring-1 ring-white/10 [clip-path:inset(0_0_0_0_round_1.5rem)]">
                        {images.map((src, idx) => (
                            <img
                                key={idx}
                                ref={el => imagesRef.current[idx] = el}
                                src={src}
                                className="absolute inset-0 w-full h-full object-cover origin-center"
                                style={{ zIndex: idx }}
                                alt={`Slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
