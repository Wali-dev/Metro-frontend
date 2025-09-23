import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/app/services/api"
import { IconPlus } from '@tabler/icons-react'

export default function SectionHeader() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [formatType, setFormatType] = useState('blog')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const createInstruction = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        console.log("clicked")

        try {
            const res = await api.addInstruction({
                title,
                description,
                format_type: formatType,
                user_id: '68b31beb50e1757d8ddddb5b',

            })
            console.log(res)

            // Reset form and close dialog
            setTitle('')
            setDescription('')
            setFormatType('blog')
            setIsDialogOpen(false)

        } catch (error) {
            console.error('Error creating instruction:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex justify-end my-4 mx-8">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" onClick={() => setIsDialogOpen(true)}>
                        <IconPlus className="mr-1 h-4 w-4" />
                        Add
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={createInstruction}>
                        <DialogHeader>
                            <DialogTitle>Add Instructions</DialogTitle>
                            <DialogDescription>
                                Make Instructions. Click save when you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-3">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="How to install node js"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Description of your instruction."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label>Type</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" type="button">
                                            {formatType === 'blog' ? 'Blog' : 'Flowchart'}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuRadioGroup
                                            value={formatType}
                                            onValueChange={setFormatType}
                                        >
                                            <DropdownMenuRadioItem value="blog">Blog</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="flowchart">Flowchart</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Creating...' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}