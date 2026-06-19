import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Auto-hide and background logic based on scroll position/direction
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();

        if (latest > 100) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }

        if (latest > previous && latest > 50) {
            if (!isMenuOpen) setHidden(true);
        } else if (latest < previous) {
            setHidden(false);
        }
    });

    const menuLinks = [
        { name: 'About', href: '#about' },
        { name: 'My Works', href: '#work' },
        { name: 'Contact', href: '#contact', isButton: true },
    ];

    const handleLinkClick = (e, href) => {
        if (href === '#contact') {
            e.preventDefault();
            window.history.pushState(null, '', '#contact');
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 left-0 w-full px-6 py-4 md:px-12 md:py-6 flex justify-between items-center z-[200] transition-colors duration-500 pointer-events-none ${hasScrolled && !hidden
                    ? "bg-black/80 backdrop-blur-md border-b border-white/5"
                    : "bg-transparent"
                    } `}
            >
                {/* LEFT: System HUD aesthetics */}
                <a
                    href="#hero"
                    className="flex flex-col gap-1 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 pointer-events-auto hover:text-[#ccff00] transition-colors duration-300"
                >
                    <span className="text-white/80">Project: RP_2026</span>
                    <span className="hidden sm:inline">Status: Preview_Active</span>
                </a>

                {/* RIGHT: Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-8 font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/60 pointer-events-auto">
                    {menuLinks.map((link) => (
                        <li key={link.name}>
                            {link.isButton ? (
                                <a
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className="relative inline-block group overflow-hidden border border-white/20 hover:border-[#ccff00] px-4 py-2 rounded-full transition-colors duration-300"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-[#ccff00] translate-y-[101%] transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 z-0"></span>
                                    <span className="relative z-10 group-hover:text-black transition-colors duration-300 delay-[50ms]">{link.name}</span>
                                </a>
                            ) : (
                                <a href={link.href} className="hover:text-white transition-colors duration-300">{link.name}</a>
                            )}
                        </li>
                    ))}
                </ul>

                {/* HAMBURGER TOGGLE (Mobile & Tablet) */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden pointer-events-auto text-white/80 hover:text-white transition-colors"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.nav>

            {/* PREMIUM MOBILE OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.08,
                                    delayChildren: 0
                                }
                            },
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden"
                    >
                        {/* Background HUD aesthetics for overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="w-full h-full bg-grid-global"></div>
                        </div>

                        <div className="flex flex-col w-full z-10">
                            {menuLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    variants={{
                                        hidden: { opacity: 0, x: -120 },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                                duration: 0.1,
                                                ease: [0.19, 1, 0.22, 1]
                                            }
                                        }
                                    }}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className={`w-full py-8 md:py-12 border-b border-white/5 flex justify-center items-center group transition-all duration-500 ease-in-out
                                        ${link.isButton ? "hover:bg-[#ccff00]" : "hover:bg-white"}
                                    `}
                                >
                                    <span className="text-4xl md:text-7xl font-overcame tracking-tighter uppercase text-white/90 group-hover:text-black transition-colors duration-300">
                                        {link.name}
                                    </span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Footer info in overlay */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.5 }
                                }
                            }}
                            className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-8"
                        >
                            <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/30">
                                <p>© 2026 Rohan Pant</p>
                                <p>All rights reserved</p>
                            </div>
                            <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 text-right">
                                <p>Haldwani, IN</p>
                                <p>Available for hire</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;