import { motion } from "framer-motion";

const footerLinks = {
    product: ["Features", "Pricing", "Demo", "Roadmap"],
    resources: ["Documentation", "Guides", "API Status", "Blog"],
    company: ["About", "Careers", "Contact", "Partners"],
    legal: ["Privacy", "Terms", "Security", "Compliance"]
};

export default function Footer() {
    return (
        <footer className="border-t border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
                    <div className="lg:col-span-1">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center">
                                <span className="font-bold text-white">IF</span>
                            </div>
                            <span className="ml-3 text-xl font-bold">Metro</span>
                        </div>
                        <p className="mt-4 text-gray-400 text-sm">
                            The future of instruction publishing.
                        </p>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                                {category}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link, index) => (
                                    <motion.li
                                        key={index}
                                        whileHover={{ x: 4 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Metro. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {['twitter', 'github', 'linkedin', 'discord'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                                aria-label={social}
                            >
                                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                                    {social[0].toUpperCase()}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}