
import { motion } from "framer-motion";
import Section from "../ui/Section";
import GlowingButton from "../ui/GlowingButton";

export default function CtaSection() {
    return (
        <Section className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 py-28">
            <div className="text-center max-w-3xl mx-auto">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Ready to Transform Your Instruction Workflows?
                </motion.h2>
                <motion.p
                    className="text-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Join thousands of teams who publish professional instructions with Metro.
                    Start your free trial today - no credit card required.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <GlowingButton className="px-8 py-4 text-lg">
                        Get Started Free
                    </GlowingButton>
                </motion.div>
            </div>
        </Section>
    );
}