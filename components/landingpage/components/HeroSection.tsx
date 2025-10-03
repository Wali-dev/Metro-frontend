import { Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="flex min-h-screen flex-col items-center pt-20 pb-16 relative">
            <div className="relative z-30 flex flex-col items-center justify-center w-full max-w-[880px] py-15 px-4 sm:px-6">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-4">
                        <div className="flex items-center justify-center gap-2 px-3.5 py-1.5 bg-white border border-black rounded-full text-sm font-medium leading-6">
                            <span className="flex-shrink-0 w-auto">
                                <img
                                    src="/image.png"
                                    alt="brand logo"
                                    className="block w-5 h-5"
                                />
                            </span>
                            Your product’s resident expert
                        </div>
                    </div>
                    <h1 className="text-center text-5xl sm:text-6xl md:text-7xl font-medium leading-tight tracking-tighter">
                        Turn Instructions Into Impact Create, Share, and Track in Minutes.

                    </h1>
                </div>

                <p className="mt-6 text-center max-w-[602px] text-lg leading-relaxed tracking-tight text-gray-900">
                    Whether it’s onboarding new hires, training your team, or documenting workflows, our platform makes it simple to publish structured instructions, share them with anyone, and track how they’re being used — all in one place.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/get-a-demo"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#A3E635] text-black text-sm font-medium leading-6 border border-black rounded shadow-[2px_2px_0_0_#0a0a0d] transition-all duration-300 hover:bg-[#b0ec4d]"
                    >
                        <Calendar className="w-5 h-5" />
                        Book Demo
                    </Link>

                    <Link
                        href="/why-metro"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium leading-6 border border-black rounded shadow-[2px_2px_0_0_#0a0a0d] transition-all duration-300 hover:bg-gray-50"
                    >
                        Learn More

                        <ExternalLink className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    className="relative block w-full h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 100"
                    preserveAspectRatio="none"
                >
                    <path
                        d="
                        M0 50 
                        Q 30 0, 60 50 
                        T 120 50 
                        T 180 50 
                        T 240 50 
                        T 300 50 
                        T 360 50 
                        T 420 50 
                        T 480 50 
                        T 540 50 
                        T 600 50 
                        T 660 50 
                        T 720 50 
                        T 780 50 
                        T 840 50 
                        T 900 50 
                        T 960 50 
                        T 1020 50 
                        T 1080 50 
                        T 1140 50 
                        T 1200 50
                        L1200 100 L0 100 Z"
                        className="fill-emerald-200 stroke-black"
                    ></path>
                </svg>
            </div>
        </div>

    );
}