
import { motion } from "framer-motion";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";

const steps = [
    {
        step: "01",
        title: "Create",
        description: "Design your instructions using our intuitive editor with rich media support."
    },
    {
        step: "02",
        title: "Collaborate",
        description: "Invite team members to review and improve your instructions in real-time."
    },
    {
        step: "03",
        title: "Publish",
        description: "Share your instructions via link, embed, or API with your audience."
    },
    {
        step: "04",
        title: "Analyze",
        description: "Track engagement and optimize based on user interaction data."
    }
];

export default function HowItWorksSection() {
    return (
        <Section id="how-it-works" className="bg-gray-900/50">
            <div className="text-center mb-16">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    How Metro Works
                </motion.h2>
                <motion.p
                    className="mt-4 text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    A seamless workflow from creation to analytics
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <GlassCard key={index} className="relative">
                        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {step.step}
                        </div>
                        <div className="pt-6">
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-400">{step.description}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
}