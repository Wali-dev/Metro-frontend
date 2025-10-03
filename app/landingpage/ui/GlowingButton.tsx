"use client";

import { motion } from "framer-motion";

interface GlowingButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    className?: string;
}

export default function GlowingButton({
    children,
    onClick,
    variant = "primary",
    className = "",
}: GlowingButtonProps) {
    const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300";
    const primaryClasses = "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50";
    const secondaryClasses = "bg-gray-800 text-cyan-400 border border-cyan-500/30 hover:bg-gray-700";

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseClasses} ${variant === "primary" ? primaryClasses : secondaryClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
}