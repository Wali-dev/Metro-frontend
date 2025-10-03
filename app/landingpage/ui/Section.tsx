import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
}

export default function Section({
    children,
    id,
    className = "",
}: SectionProps) {
    return (
        <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
            <div className="max-w-7xl mx-auto">{children}</div>
        </section>
    );
}