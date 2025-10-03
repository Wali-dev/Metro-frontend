"use client";

import { motion } from "framer-motion";

interface AnimatedGradientTextProps {
    children: React.ReactNode;
}

export default function AnimatedGradientText({
    children,
}: AnimatedGradientTextProps) {
    return (
        <motion.div
            className="relative flex items-center justify-center overflow-hidden rounded-full p-1 text-xs font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-75 blur-sm" />
            <span className="relative bg-gray-900 px-4 py-1.5 rounded-full">
                {children}
            </span>
        </motion.div>
    );
}