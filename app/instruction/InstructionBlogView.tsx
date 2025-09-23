'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Eye } from 'lucide-react';
import type { Instruction, Step as InstructionStep } from '@/app/interfaces/interfaces';

interface Props {
    instruction: Instruction;
}

const InstructionBlogView: React.FC<Props> = ({ instruction }) => {
    const [openSteps, setOpenSteps] = useState<Set<string>>(new Set());

    const toggleStep = (stepId: string) => {
        const newOpenSteps = new Set(openSteps);
        if (newOpenSteps.has(stepId)) {
            newOpenSteps.delete(stepId);
        } else {
            newOpenSteps.add(stepId);
        }
        setOpenSteps(newOpenSteps);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const sortedSteps = instruction.steps?.sort((a, b) => a.step_order - b.step_order) || [];

    // Apply theme settings
    const themeSettings = instruction.theme_settings as { color?: string; font?: string } | undefined;
    const themeColor = themeSettings?.color || 'blue';
    const themeFont = themeSettings?.font || 'Inter';

    const getColorClasses = (color: string) => {
        const colorMap: { [key: string]: string } = {
            green: 'text-green-600 border-green-200 bg-green-50',
            blue: 'text-blue-600 border-blue-200 bg-blue-50',
            red: 'text-red-600 border-red-200 bg-red-50',
            purple: 'text-purple-600 border-purple-200 bg-purple-50',
            orange: 'text-orange-600 border-orange-200 bg-orange-50',
        };
        return colorMap[color] || colorMap.blue;
    };

    const getAccentColorClasses = (color: string) => {
        const colorMap: { [key: string]: string } = {
            green: 'bg-green-500 hover:bg-green-600',
            blue: 'bg-blue-500 hover:bg-blue-600',
            red: 'bg-red-500 hover:bg-red-600',
            purple: 'bg-purple-500 hover:bg-purple-600',
            orange: 'bg-orange-500 hover:bg-orange-600',
        };
        return colorMap[color] || colorMap.blue;
    };

    return (
        <div
            className="min-h-screen bg-gray-50 py-8 px-4"
            style={{ fontFamily: themeFont }}
        >
            <article className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden">
                {/* Header Section */}
                <header className="p-8 border-b border-gray-200">
                    <div className="space-y-6">
                        {/* Title */}
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                            {instruction.title}
                        </h1>

                        {/* Description */}
                        {instruction.description && (
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {instruction.description}
                            </p>
                        )}

                        {/* Banner Image */}
                        {instruction.banner_image && (
                            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={instruction.banner_image}
                                    alt={instruction.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Published on {formatDate(instruction.createdAt)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{instruction.views_count} views</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Steps Section */}
                <main className="p-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Steps
                        </h2>

                        {sortedSteps.map((step: InstructionStep, index: number) => {
                            const stepId = step._id ?? `order-${step.step_order}-${index}`;
                            return (
                                <div
                                    key={stepId}
                                    className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                                >
                                    {/* Step Header */}
                                    <button
                                        onClick={() => toggleStep(stepId)}
                                        className={`w-full p-4 text-left flex items-center justify-between transition-colors duration-200 ${getColorClasses(themeColor)}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`w-8 h-8 rounded-full text-white text-sm font-semibold flex items-center justify-center ${getAccentColorClasses(themeColor)}`}>
                                                {step.step_order}
                                            </span>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {step.title}
                                            </h3>
                                        </div>
                                        {openSteps.has(stepId) ? (
                                            <ChevronUp className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        )}
                                    </button>

                                    {/* Step Content */}
                                    {openSteps.has(stepId) && (
                                        <div className="p-6 bg-white border-t border-gray-100">
                                            <div className="space-y-4">
                                                {/* Step Image */}
                                                {step.image_url && (
                                                    <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100">
                                                        <img
                                                            src={step.image_url}
                                                            alt={step.title}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.style.display = 'none';
                                                            }}
                                                        />
                                                    </div>
                                                )}

                                                {/* Step Video */}
                                                {step.video_url && (
                                                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                                                        <video
                                                            controls
                                                            className="w-full h-full"
                                                            poster=""
                                                        >
                                                            <source src={step.video_url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                )}

                                                {/* Step Description (Rich Text) */}
                                                {step.description && (
                                                    <div
                                                        className="prose prose-gray max-w-none"
                                                        dangerouslySetInnerHTML={{
                                                            __html: step.description
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-8 border-t border-gray-200 bg-gray-50">
                    <div className="text-center text-sm text-gray-500">
                        <p>Last updated on {formatDate(instruction.updatedAt)}</p>
                    </div>
                </footer>
            </article>
        </div>
    );
};

export default InstructionBlogView;