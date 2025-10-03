"use client";

import { motion } from "framer-motion";
import AnimatedGradientText from "../ui/AnimatedGradientText";
import GlowingButton from "../ui/GlowingButton";


export default function HeroSection() {
    return (
        <div className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <AnimatedGradientText>
                    <span className="text-xs">🚀 Just launched: Real-time collaboration</span>
                </AnimatedGradientText>

                <motion.h1
                    className="mt-8 text-4xl sm:text-6xl font-bold tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Publish & Share Instructions{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        at Scale
                    </span>
                </motion.h1>

                <motion.p
                    className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Create professional, interactive instructions that your team and customers will actually follow.
                    Version control, analytics, and real-time collaboration built-in.
                </motion.p>

                <motion.div
                    className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <GlowingButton>Get Started Free</GlowingButton>
                    <GlowingButton variant="secondary">View Demo</GlowingButton>
                </motion.div>
            </div>
        </div>
    );
}