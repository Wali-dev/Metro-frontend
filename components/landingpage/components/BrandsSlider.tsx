'use client';

import React from 'react';
import Image from 'next/image';
import { Figtree } from 'next/font/google';

const figtree = Figtree({ subsets: ['latin'] });

type Brand = {
    name: string;
    logo: string;
};

const BrandSlider: React.FC = () => {
    const items: Brand[] = [
        { name: "1", logo: "/brandSliderLogo/logoipsum-215.svg" },
        { name: "2", logo: "/brandSliderLogo/logoipsum-242.svg" },
        { name: "4", logo: "/brandSliderLogo/logoipsum-350.svg" },
        { name: "5", logo: "/brandSliderLogo/logoipsum-364.svg" },
        { name: "3", logo: "/brandSliderLogo/logoipsum-367.svg" },
        { name: "4", logo: "/brandSliderLogo/logoipsum-378.svg" },
        { name: "5", logo: "/brandSliderLogo/logoipsum-391.svg" }
    ];

    // Duplicate items for seamless effect
    const loopItems = [...items, ...items];

    return (
        <div className="relative w-full overflow-hidden mt-4">
            <div className="flex w-max animate-marquee">
                {loopItems.map((brand, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 flex gap-2 items-center justify-center w-40 h-20 mx-4 bg-blue rounded-lg"
                    >
                        <Image
                            src={brand.logo}
                            alt={brand.name}
                            width={120}
                            height={60}
                            className="object-contain"
                        />
                        {/* <div className={`figtree.className font-bold `}>{brand.name.toUpperCase()}</div> */}
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default BrandSlider;
