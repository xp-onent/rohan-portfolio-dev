export default function Footer() {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative bg-neutral-950">
            <h2 className="text-4xl md:text-7xl font-semibold tracking-tight text-white mb-8">
                The End
            </h2>
            <a href="#" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[0] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2FB6C_0%,#393BB2_50%,#E2FB6C_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:bg-slate-900">
                    Back to Top
                </span>
            </a>
        </section>
    )
}
