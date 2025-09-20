
'use client'

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SectionHeader from '@/components/custom/section-header'
import { Badge } from "@/components/ui/badge";
import { api } from "@/app/services/api";
import { Instruction, InstructionResponse } from '@/app/interfaces/interfaces';
import { Button } from '@/components/ui/button';
import { IconMenu3 } from '@tabler/icons-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileEdit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation'

const Page = () => {
    const [instructions, setInstructions] = useState<Instruction[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [instructionToDelete, setInstructionToDelete] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        const fetchInstructions = async () => {
            try {
                const response = await api.getInstructionsByUser('68b31beb50e1757d8ddddb5b') as InstructionResponse;
                setInstructions(response.instructions);
            } catch (error) {
                console.error('Error fetching instructions:', error);
                setInstructions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructions();
    }, []);

    const handleDeleteClick = (instruction_id: string) => {
        setInstructionToDelete(instruction_id);
        setDeleteDialogOpen(true);
    };

    const handleInstructionDelete = async () => {
        if (!instructionToDelete) return;

        try {
            await api.deleteInstruction(instructionToDelete);
            setInstructions(instructions.filter(item => item._id !== instructionToDelete));
            setDeleteDialogOpen(false);
            setInstructionToDelete(null);
        } catch (error) {
            console.error('Error deleting instruction:', error);
        }
    };

    const handleRedirection = (item: Instruction) => {
        try {
            router.push(`/dashboard/instructions/${item._id}?data=${encodeURIComponent(JSON.stringify(item))}`)
        } catch (error) {
            console.error(error)
        }
    }

    // Skeleton loader card
    const renderSkeleton = () => (
        <Card className="w-full animate-pulse">
            <CardHeader>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </CardHeader>
            <CardContent className='py-0'>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </CardContent>
        </Card>
    )

    return (
        <div>
            <SectionHeader />
            <section className='h-full mx-8'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <React.Fragment key={index}>
                                {renderSkeleton()}
                            </React.Fragment>
                        ))
                        : instructions.map(item => (
                            <Card key={item._id} className="w-full cursor-pointer" onClick={() => handleRedirection(item)}>
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                    <CardAction>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <IconMenu3 className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-32">
                                                <DropdownMenuItem>
                                                    <FileEdit className="mr-2 h-4 w-4" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-600"
                                                    onClick={() => item._id && handleDeleteClick(item._id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CardAction>
                                </CardHeader>
                                <CardContent className='py-0'>
                                    <div className='flex items-center justify-between gap-2 flex-wrap'>
                                        <div className="flex items-center justify-around w-full">
                                            <div className="flex w-full justify-between items-center gap-2">
                                                <div className="text-sm text-muted-foreground">Format: {item.format_type}</div>
                                                {item.is_published ? (
                                                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                                        Online
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                                                        Draft
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Created: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </section>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this instruction
                            and remove it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleInstructionDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Page
