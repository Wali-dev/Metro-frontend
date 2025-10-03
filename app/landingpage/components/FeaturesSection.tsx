
import { motion } from "framer-motion";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";

const features = [
    {
        title: "Publish Instructions",
        description: "Create beautiful, interactive instructions with rich media support and step-by-step guidance.",
        icon: "📝"
    },
    {
        title: "Real-Time Collaboration",
        description: "Work together with your team in real-time with live editing and comments.",
        icon: "👥"
    },
    {
        title: "Version Control",
        description: "Track changes, revert to previous versions, and maintain a complete history of your instructions.",
        icon: "🔄"
    },
    {
        title: "Analytics Dashboard",
        description: "See how users interact with your instructions with detailed engagement metrics.",
        icon: "📊"
    }
];

export default function FeaturesSection() {
    return (
        <Section id="features">
            <div className="text-center mb-16">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Powerful Features for Modern Teams
                </motion.h2>
                <motion.p
                    className="mt-4 text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Everything you need to create, manage, and optimize your instruction workflows
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <GlassCard key={index} className="text-center">
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
}