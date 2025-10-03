
import { motion } from "framer-motion";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";
import GlowingButton from "../ui/GlowingButton";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for individuals and small projects",
        features: [
            "Up to 3 instruction sets",
            "Basic analytics",
            "Community support",
            "Standard publishing"
        ],
        cta: "Get Started",
        featured: false
    },
    {
        name: "Pro",
        price: "$29",
        period: "per month",
        description: "For growing teams and professionals",
        features: [
            "Unlimited instruction sets",
            "Advanced analytics",
            "Priority support",
            "Custom branding",
            "API access",
            "Real-time collaboration"
        ],
        cta: "Start Free Trial",
        featured: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large organizations with advanced needs",
        features: [
            "Everything in Pro",
            "SSO & SAML",
            "Dedicated account manager",
            "Custom integrations",
            "SLA guarantee",
            "On-premise options"
        ],
        cta: "Contact Sales",
        featured: false
    }
];

export default function PricingSection() {
    return (
        <Section id="pricing">
            <div className="text-center mb-16">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Simple, Transparent Pricing
                </motion.h2>
                <motion.p
                    className="mt-4 text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Choose the plan that works best for your team
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plans.map((plan, index) => (
                    <GlassCard
                        key={index}
                        className={`relative ${plan.featured ? 'ring-2 ring-purple-500 scale-105' : ''}`}
                    >
                        {plan.featured && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                                MOST POPULAR
                            </div>
                        )}

                        <div className="text-center p-6">
                            <h3 className="text-2xl font-bold">{plan.name}</h3>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.period && <span className="text-gray-400">/{plan.period}</span>}
                            </div>
                            <p className="mt-2 text-gray-400">{plan.description}</p>

                            <ul className="mt-6 space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <GlowingButton
                                    variant={plan.featured ? "primary" : "secondary"}
                                    className="w-full"
                                >
                                    {plan.cta}
                                </GlowingButton>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
}