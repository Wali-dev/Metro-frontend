
import { motion } from "framer-motion";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";

export default function DemoSection() {
    const codeSnippet = `// Create a new instruction set
const instructions = new InstructionSet({
  title: "Server Setup Guide",
  steps: [
    {
      title: "Install Dependencies",
      content: "Run: npm install server-package",
      media: "https://example.com/install.gif"
    },
    {
      title: "Configure Environment",
      content: "Set environment variables in .env file",
      media: "https://example.com/config.png"
    }
  ]
});

// Publish to your audience
instructions.publish({
  audience: ["team", "customers"],
  channels: ["web", "email", "api"]
});`;

    return (
        <Section id="demo">
            <div className="text-center mb-16">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    See It In Action
                </motion.h2>
                <motion.p
                    className="mt-4 text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Our API makes it easy to integrate with your existing workflows
                </motion.p>
            </div>

            <div className="max-w-4xl mx-auto">
                <GlassCard className="overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-gray-400">instructions.js</span>
                    </div>
                    <pre className="p-6 overflow-x-auto text-sm">
                        <code className="text-cyan-300">{codeSnippet}</code>
                    </pre>
                </GlassCard>
            </div>
        </Section>
    );
}