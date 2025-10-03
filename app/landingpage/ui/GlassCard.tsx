"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function GlassCard({
    children,
    className = "",
}: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`glassmorphism card-glow rounded-2xl p-6 ${className}`}
        >
            {children}
        </motion.div>
    );
}