"use client";


import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";

const testimonials = [
    {
        name: "Alex Johnson",
        role: "CTO, TechFlow Inc.",
        content: "Metro reduced our onboarding time by 70%. Our team can now create professional instructions in minutes instead of hours.",
        avatar: "AJ"
    },
    {
        name: "Sarah Chen",
        role: "Product Manager, InnovateX",
        content: "The real-time collaboration feature is a game-changer. We've eliminated version conflicts and improved our documentation quality significantly.",
        avatar: "SC"
    },
    {
        name: "Michael Rodriguez",
        role: "DevOps Lead, CloudScale",
        content: "Analytics dashboard gives us insights we never had before. We can see exactly where users struggle and optimize our instructions accordingly.",
        avatar: "MR"
    }
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section id="testimonials" className="bg-gray-900/50">
            <div className="text-center mb-16">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Trusted by Industry Leaders
                </motion.h2>
                <motion.p
                    className="mt-4 text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Join thousands of teams who have transformed their instruction workflows
                </motion.p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="relative h-64">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{
                                opacity: index === currentIndex ? 1 : 0,
                                x: index === currentIndex ? 0 : 20,
                                zIndex: index === currentIndex ? 10 : 1
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <GlassCard className="text-center p-8">
                                <div className="text-5xl mb-4">"</div>
                                <p className="text-lg italic mb-6">{testimonial.content}</p>
                                <div className="flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold mr-4">
                                        {testimonial.avatar}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-gray-400 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-cyan-500' : 'bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}