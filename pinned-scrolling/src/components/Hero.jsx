export default function Hero() {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
            <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-bold tracking-tighter uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                Premium
            </h1>
            <p className="text-lg md:text-2xl text-neutral-400 font-light tracking-wide">
                Scroll down to explore
            </p>
        </section>
    )
}
