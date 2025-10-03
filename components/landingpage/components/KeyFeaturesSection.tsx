"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const featuresData = [
    {
        id: "instructions",
        label: "1. Instructions",
        title: "Step-by-Step Instructions",
        subtitle:
            "Easily create structured guides that combine text, images, and videos.",
        mainImage: {
            src: "https://via.placeholder.com/480x560",
            alt: "Step-by-step instructions",
            width: 480,
            height: 560,
        },
        benefits: [
            "Clear, organized instructions for any process",
            "Combine media to make content engaging and simple",
            "Improve learning and adoption for users",
        ],
        keyFeatures: [
            {
                title: "Interactive Steps",
                description:
                    "Each step can include descriptions, images, or embedded videos for clarity.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Interactive Steps",
                    width: 236,
                    height: 140,
                },
            },
            {
                title: "Drag & Drop Editor",
                description:
                    "Quickly reorder or update steps without technical hassle.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Drag & Drop Editor",
                    width: 236,
                    height: 140,
                },
            },
        ],
    },
    {
        id: "customizations",
        label: "2. Customizations",
        title: "Customizable Themes",
        subtitle: "Style your instructions to match your brand and identity.",
        mainImage: {
            src: "https://via.placeholder.com/480x560",
            alt: "Customizable Themes",
            width: 480,
            height: 560,
        },
        benefits: [
            "Choose from pre-built themes or design your own",
            "Highlight your brand with unique fonts and colors",
            "Deliver consistent visual experiences across guides",
        ],
        keyFeatures: [
            {
                title: "Theme Settings",
                description:
                    "Easily change fonts, colors, and layout without coding.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Theme Settings",
                    width: 236,
                    height: 140,
                },
            },
            {
                title: "Custom Banners",
                description:
                    "Add header images or branding banners to every instruction set.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Custom Banners",
                    width: 236,
                    height: 140,
                },
            },
        ],
    },
    {
        id: "insights",
        label: "5. Insights",
        title: "Analytics Dashboard",
        subtitle: "Gain real-time insights into user engagement and performance.",
        mainImage: {
            src: "https://via.placeholder.com/480x560",
            alt: "Analytics Dashboard",
            width: 480,
            height: 560,
        },
        benefits: [
            "Monitor views and completion rates for each instruction",
            "Identify steps where users drop off",
            "Optimize guides based on usage data",
        ],
        keyFeatures: [
            {
                title: "Engagement Metrics",
                description:
                    "Track how many users viewed and completed instructions.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Engagement Metrics",
                    width: 236,
                    height: 140,
                },
            },
            {
                title: "Step Performance",
                description:
                    "See which steps are most effective and where users struggle.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Step Performance",
                    width: 236,
                    height: 140,
                },
            },
        ],
    },
    {
        id: "sharing",
        label: "3. Sharing",
        title: "Easy Sharing",
        subtitle: "Distribute your guides effortlessly with multiple sharing options.",
        mainImage: {
            src: "https://via.placeholder.com/480x560",
            alt: "Easy Sharing",
            width: 480,
            height: 560,
        },
        benefits: [
            "One-click share links",
            "Embed instructions in apps, websites, or portals",
            "Seamless integration with existing tools",
        ],
        keyFeatures: [
            {
                title: "Public & Private Links",
                description:
                    "Choose whether guides are open to all or restricted to your team.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Public & Private Links",
                    width: 236,
                    height: 140,
                },
            },
            {
                title: "Embed Options",
                description:
                    "Place instructions directly inside your app or product UI.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Embed Options",
                    width: 236,
                    height: 140,
                },
            },
        ],
    },
    {
        id: "team",
        label: "4. Team",
        title: "Team Collaboration",
        subtitle: "Work together to build and maintain instructions efficiently.",
        mainImage: {
            src: "https://via.placeholder.com/480x560",
            alt: "Team Collaboration",
            width: 480,
            height: 560,
        },
        benefits: [
            "Invite multiple team members",
            "Assign roles for editing or reviewing",
            "Collaborate in real-time with instant updates",
        ],
        keyFeatures: [
            {
                title: "Role-Based Access",
                description: "Define permissions for editors, viewers, and admins.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Role-Based Access",
                    width: 236,
                    height: 140,
                },
            },
            {
                title: "Live Collaboration",
                description:
                    "See changes from team members instantly as they happen.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Live Collaboration",
                    width: 236,
                    height: 140,
                },
            },
        ],
    },
    {
        id: "security",
        label: "6. Security",
        title: "Secure & Reliable",
        subtitle: "Your data and instructions are safe with enterprise-grade security.",
        mainImage: {
            src: "https://via.placeholder.com/480x560",
            alt: "Secure & Reliable",
            width: 480,
            height: 560,
        },
        benefits: [
            "Advanced encryption protects sensitive data",
            "Reliable uptime and hosting infrastructure",
            "Control access with authentication & permissions",
        ],
        keyFeatures: [
            {
                title: "Data Encryption",
                description: "All data is encrypted at rest and in transit.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Data Encryption",
                    width: 236,
                    height: 140,
                },
            },
            {
                title: "Access Controls",
                description:
                    "Manage who can view or edit instructions at any level.",
                image: {
                    src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                    alt: "Access Controls",
                    width: 236,
                    height: 140,
                },
            },
        ],
    },
];

type Feature = typeof featuresData[number];

export default function KeyFeatures() {
    const [feature, setFeature] = useState<Feature>(featuresData[0]);

    return (
        <div className="flex min-h-screen flex-col items-center pt-20 pb-16">
            <div className="relative z-30 flex flex-col items-center justify-center w-full max-w-[880px] py-15 px-4 sm:px-6">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-4">
                        <div className="flex items-center justify-center gap-2 px-3.5 py-1.5 bg-white border border-black rounded-full text-sm font-medium leading-6">
                            <span className="flex-shrink-0 w-auto">
                                <img
                                    src="/star.png"
                                    alt="brand logo"
                                    className="block w-5 h-5"
                                />
                            </span>
                            Introducing Metro
                        </div>
                    </div>
                    <h3 className="text-center text-5xl font-medium leading-tight tracking-tighter">
                        Everything you need to create, share, and optimize instructions
                    </h3>
                </div>

                <p className="mt-6 text-center max-w-[602px] text-lg leading-relaxed tracking-tight text-gray-900">
                    Our platform gives you the tools to move fast and stay organized — from
                    building step-by-step instructions to tracking engagement in real time.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    {featuresData.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setFeature(item)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium leading-6 border border-black rounded shadow-[2px_2px_0_0_#0a0a0d] transition-all duration-300 hover:cursor-pointer ${feature.id === item.id
                                ? "bg-[#A3E635] text-black font-semibold"
                                : "bg-white hover:bg-[#A3E635]"
                                }`}
                        >
                            {item.label}
                        </div>
                    ))}

                    <div className="w-full bg-white border border-black rounded-3xl p-12 shadow-[1px_1px_0_0_#0a0a0d] mt-5">
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Main Image */}
                            <div className="w-full lg:w-[480px] max-w-full overflow-hidden border border-black rounded-xl shadow-[2px_2px_0_0_#0a0a0d]">
                                <Image
                                    src={feature.mainImage.src}
                                    alt={feature.mainImage.alt}
                                    width={feature.mainImage.width}
                                    height={feature.mainImage.height}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </div>

                            {/* Content */}
                            <div className="w-full lg:w-[714px] text-black">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold leading-[34px]">
                                        {feature.title}
                                    </h3>
                                </div>

                                <p className="text-lg font-bold leading-6 mb-4">
                                    {feature.subtitle}
                                </p>

                                <ul className="list-disc pl-6 space-y-2 mb-6 text-base leading-6">
                                    {feature.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 px-3.5 py-1 bg-white border border-black rounded-full w-fit text-sm font-medium leading-6">
                                        <Image
                                            src="https://cdn.prod.website-files.com/68397108d6cb6ceb1b41f856/68665b20d5bd058982f90b56_Group%202085665857.svg"
                                            alt="green flag"
                                            width={14}
                                            height={14}
                                            className="w-3.5 h-3.5"
                                        />
                                        <span>Key Features</span>
                                    </div>

                                    <div className="space-y-8">
                                        {feature.keyFeatures.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col md:flex-row gap-8 items-start"
                                            >
                                                <div className="w-full md:w-1/3 overflow-hidden border border-black rounded-lg">
                                                    <Image
                                                        src={item.image.src}
                                                        alt={item.image.alt}
                                                        width={item.image.width}
                                                        height={item.image.height}
                                                        className="w-full h-auto"
                                                    />
                                                </div>
                                                <div className="w-full md:w-2/3">
                                                    <h4 className="text-lg font-bold leading-6 mb-2">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-base font-medium leading-6">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
