'use client';

import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { label: 'Why Metro', href: '/why-metro' },
        { label: 'Pricing', href: '/pricing' },
    ];

    return (
        <header className="bg-white border-b border-gray-900 shadow-[2px_2px_0_0_#0a0a0d]">
            <div className="flex items-center justify-between px-6 md:px-12 py-3 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" aria-label="home" className="flex-shrink-0 w-[132px]">
                    <img
                        src="/image.png"
                        alt="brand logo"
                        className="block w-12 h-12"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-gray-800 text-lg font-normal leading-6 transition-all duration-300 hover:text-blue-600 px-3.5 py-0.5 rounded-md"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-3 ml-4">
                        <Link
                            href="*"
                            className="flex items-center justify-center px-4 py-2 text-black text-sm font-medium leading-6 border border-gray-900 rounded shadow-[2px_2px_0_0_#0a0a0d] transition-all duration-300 hover:bg-gray-50"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/get-a-demo"
                            className="flex items-center gap-2 px-4 py-2 bg-[#A3E635] text-black text-sm font-medium leading-6 border border-gray-900 rounded shadow-[2px_2px_0_0_#0a0a0d] transition-all duration-300 hover:bg-[#b0ec4d]"
                        >
                            <Calendar className="w-5 h-5" />
                            Book Demo
                        </Link>
                    </div>
                </nav>

                {/* Hamburger Button */}
                <button
                    className="md:hidden flex flex-col space-y-1.5"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle Menu"
                >
                    <span className="w-6 h-0.5 bg-black"></span>
                    <span className="w-6 h-0.5 bg-black"></span>
                    <span className="w-6 h-0.5 bg-black"></span>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-gray-900 bg-white shadow-lg">
                    <div className="flex flex-col px-6 py-4 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-gray-800 text-lg font-normal hover:text-blue-600"
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Auth Buttons */}
                        <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">
                            <Link
                                href="*"
                                className="flex items-center justify-center px-4 py-2 text-black text-sm font-medium border border-gray-900 rounded shadow-[2px_2px_0_0_#0a0a0d] hover:bg-gray-50"
                                onClick={() => setMobileOpen(false)}
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/get-a-demo"
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#A3E635] text-black text-sm font-medium border border-gray-900 rounded shadow-[2px_2px_0_0_#0a0a0d] hover:bg-[#b0ec4d]"
                                onClick={() => setMobileOpen(false)}
                            >

                                <Calendar className="w-5 h-5" />
                                Book Demo
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
