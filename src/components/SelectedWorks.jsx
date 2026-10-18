import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Video component that plays/pauses based on viewport visibility
const ProjectVideo = ({ src, isActive, className }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isActive) {
            video.play().catch(err => {
                console.warn("Video play failed:", err);
            });
        } else {
            video.pause();
        }
    }, [isActive]);

    return (
        <video
            ref={videoRef}
            src={src}
            className={className}
            muted
            loop
            playsInline
        />
    );
};

const projects = [
    {
        id: 3,
        title: "SYNTHESIS",
        client: "OMNICORP",
        role: "MOTION GRAPHICS",
        video: "/works-vid1.webm",
        renderLayout: (p, isActive) => (
            <div className={`w-full h-full flex flex-col-reverse md:flex-row gap-6 md:gap-12 p-6 md:p-12 bg-black/40 border backdrop-blur-md rounded-2xl items-center transition-colors duration-700 overflow-y-auto md:overflow-hidden ${isActive ? 'border-white/20' : 'border-white/5'}`}>
                <div className="w-full md:w-2/3 flex flex-col space-y-4 md:space-y-8">
                    <p className={`font-mono text-[10px] tracking-[0.3em] transition-colors duration-700 ${isActive ? 'text-[#ccff00]' : 'text-white/30'}`}>01 // SHOWREEL</p>
                    <h3 className={`text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none transition-colors duration-700 ${isActive ? 'text-[#e5e5e5]' : 'text-white/30'}`}>{p.title}</h3>
                    <p className="font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-widest max-w-sm">
                        High-impact temporal manipulation and kinetic typography execution for {p.client}.
                    </p>
                </div>
                <div className="w-full md:w-1/3 h-[30vh] md:h-[60vh] shrink-0 overflow-hidden rounded-xl relative group">
                    <ProjectVideo src={p.video} isActive={isActive} className={`w-full h-full object-cover origin-right transition-all duration-700 ease-out scale-105 ${isActive ? 'grayscale-0 opacity-100 scale-100' : 'grayscale opacity-50'}`} />
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "ECLIPSE",
        client: "STELLAR",
        role: "COMMERCIAL",
        video: "/works-vid2.webm",
        renderLayout: (p, isActive) => (
            <div className={`w-full h-full relative flex items-center justify-center p-6 md:p-12 bg-black/40 border backdrop-blur-md rounded-2xl overflow-hidden transition-colors duration-700 ${isActive ? 'border-white/20' : 'border-white/5'}`}>
                <div className={`font-mono text-[10px] tracking-[0.3em] absolute top-6 md:top-12 left-6 md:left-12 transition-colors duration-700 ${isActive ? 'text-[#ccff00]' : 'text-white/30'}`}>02 // SHOWREEL</div>
                <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest absolute bottom-6 md:bottom-12 right-6 md:right-12 text-right">
                    Client: {p.client}<br />Role: {p.role}
                </div>
                <h3 className={`text-[12vw] md:text-[10vw] font-bold uppercase tracking-tighter absolute whitespace-nowrap z-0 pointer-events-none transition-colors duration-700 ${isActive ? 'text-white/5' : 'text-black opacity-10'}`}>{p.title}</h3>

                <div className="w-[90%] md:w-[80%] h-[70%] md:h-[80%] overflow-hidden rounded-xl relative shadow-2xl shadow-black/50 z-10">
                    <ProjectVideo src={p.video} isActive={isActive} className={`w-full h-full object-cover transition-all duration-700 ease-out scale-105 ${isActive ? 'grayscale-0 opacity-100 scale-100' : 'grayscale opacity-50'}`} />
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 bg-black/20 backdrop-blur-sm ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        <h4 className="text-2xl md:text-4xl font-bold tracking-widest text-white">{p.title}</h4>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "TERMINUS",
        client: "PERSONAL",
        role: "DIRECTOR'S CUT",
        video: "/works-vid3.webm",
        renderLayout: (p, isActive) => (
            <div className={`w-full h-full relative rounded-2xl overflow-hidden border transition-colors duration-700 ${isActive ? 'border-white/20' : 'border-white/5'}`}>
                <ProjectVideo src={p.video} isActive={isActive} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out scale-110 ${isActive ? 'grayscale-0 opacity-80 scale-100' : 'grayscale opacity-20'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 z-10">
                    <p className={`font-mono text-[10px] tracking-[0.5em] mb-4 md:mb-6 transition-all duration-700 delay-100 ${isActive ? 'text-[#ccff00] opacity-100 translate-y-0' : 'text-white/30 opacity-0 translate-y-4'}`}>03 // FINAL PIECE</p>
                    <h3 className={`text-4xl sm:text-7xl md:text-9xl font-bold uppercase tracking-tighter mb-4 transition-colors duration-700 ${isActive ? 'text-[#e5e5e5]' : 'text-white/30'}`}>{p.title}</h3>
                    <p className={`font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-[0.3em] transition-all duration-700 delay-200 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        {p.client} — {p.role}
                    </p>
                </div>
            </div>
        )
    }
];

import { ArrowRight } from 'lucide-react';

const SelectedWorks = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [activeCardId, setActiveCardId] = useState(null);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isSectionVisible, setIsSectionVisible] = useState(false);

    // GSAP Responsive Logic
    useEffect(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const track = trackRef.current;
            if (!track || !sectionRef.current) return;

            const getScrollAmount = () => {
                let trackWidth = trackRef.current.scrollWidth;
                return -(trackWidth - window.innerWidth);
            };

            gsap.to(track, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    end: () => `+=${trackRef.current.scrollWidth}`
                }
            });
        });

        return () => mm.revert();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSectionVisible(entry.isIntersecting);
            },
            {
                threshold: 0.65 // section visible when 65% in view
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            observer.disconnect();
        };
    }, []);

    // Scroll listener for mobile indicator
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            const scrollProgress = (scrollLeft + clientWidth) / scrollWidth;
            setIsAtEnd(scrollProgress > 0.8);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for auto-colorization
    useEffect(() => {
        const observerOptions = {
            root: scrollContainerRef.current,
            rootMargin: '0px -20% 0px -20%',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = parseInt(entry.target.getAttribute('data-id'));
                    setActiveCardId(id);
                }
            });
        }, observerOptions);

        const cardElements = document.querySelectorAll('.work-card');
        cardElements.forEach(el => observer.observe(el));

        return () => {
            cardElements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    return (
        <section ref={sectionRef} id="work" className="h-screen w-full relative overflow-hidden bg-transparent flex flex-col lg:flex-row">

            {/* Pinned Vertical Title */}
            <div className="sticky top-0 h-16 lg:h-screen w-full lg:w-32 shrink-0 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 bg-black/80 backdrop-blur-md z-20 pointer-events-none">
                <h2 className="text-[#e5e5e5] font-mono uppercase tracking-[0.5em] lg:tracking-[1em] text-lg lg:text-4xl lg:-rotate-90 whitespace-nowrap">
                    My Works
                </h2>
            </div>

            {/* Mobile/Tablet Scroll Indicator */}
            <div className={`lg:hidden fixed bottom-10 right-10 z-30 transition-all duration-500 ease-in-out ${isSectionVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl flex items-center justify-center shadow-2xl overflow-hidden group">
                    <div className={`transition-transform duration-500 ease-expo ${isAtEnd ? 'rotate-180' : 'rotate-0'}`}>
                        <ArrowRight size={20} className="text-white opacity-80" />
                    </div>
                    <div className="absolute inset-0 bg-white/5 animate-pulse rounded-full pointer-events-none"></div>
                </div>
            </div>

            {/* The Horizontal Scroll Track */}
            <div 
                ref={scrollContainerRef}
                className="h-full w-full overflow-y-hidden overflow-x-auto lg:overflow-x-hidden flex-1 snap-x snap-mandatory scrollbar-hide"
            >
                <div ref={trackRef} className="h-full flex items-center pt-8 pb-8 gap-8 lg:gap-24 pl-8 lg:pl-24 w-max">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            data-id={project.id}
                            className="work-card w-[90vw] lg:w-[65vw] h-full shrink-0 flex items-center snap-center"
                        >
                            <div className="w-full h-[70vh] lg:h-[80vh]">
                                {project.renderLayout(project, activeCardId === project.id)}
                            </div>
                        </div>
                    ))}
                    <div className="w-[10vw] lg:w-[18vw] h-full shrink-0 bg-transparent"></div>
                </div>
            </div>

        </section>
    );
};

export default SelectedWorks;
