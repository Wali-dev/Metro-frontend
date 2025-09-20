
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import { useEffect } from 'react'

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Link as LinkIcon,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Quote,
    Code2,
    Undo,
    Redo,
    Heading1,
    Heading2,
    Heading3,
    Minus,
    Pilcrow,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const lowlight = createLowlight()

lowlight.register('css', css)
lowlight.register('javascript', js)
lowlight.register('typescript', ts)
lowlight.register('html', html)

interface TiptapEditorProps {
    content?: string
    onChange?: (content: string) => void
    placeholder?: string
}

export default function TiptapEditor({ content = '', onChange, placeholder = 'Start writing...' }: TiptapEditorProps) {
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm',
                },
            }),
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange?.(html)
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 border-t prose-headings:font-semibold prose-p:leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded',
                placeholder: placeholder,
            },
        },
    })

    // Update editor content when content prop changes
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    const addLink = () => {
        if (linkUrl) {
            editor?.chain().focus().setLink({ href: linkUrl }).run()
            setLinkUrl('')
            setIsLinkDialogOpen(false)
        }
    }

    const removeLink = () => {
        editor?.chain().focus().unsetLink().run()
    }

    const addImage = () => {
        if (imageUrl) {
            editor?.chain().focus().setImage({ src: imageUrl }).run()
            setImageUrl('')
            setIsImageDialogOpen(false)
        }
    }

    if (!editor) {
        return <div className="min-h-[200px] border rounded-md p-4 flex items-center justify-center text-gray-500">Loading editor...</div>
    }

    return (
        <div className="border rounded-lg shadow-sm bg-white">
            {/* Enhanced Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-3 border-b bg-gray-50 rounded-t-lg">
                {/* Text Formatting */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Bold"
                    >
                        <Bold className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Italic"
                    >
                        <Italic className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('underline') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Underline"
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('strike') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Strikethrough"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('code') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Inline Code"
                    >
                        <Code className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Headings */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('paragraph') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Paragraph"
                    >
                        <Pilcrow className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Heading 1"
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Heading 2"
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Heading 3"
                    >
                        <Heading3 className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Text Alignment */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Align Left"
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Align Center"
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Align Right"
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Lists */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Bullet List"
                    >
                        <List className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Numbered List"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Block Elements */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Blockquote"
                    >
                        <Quote className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`h-8 w-8 p-0 ${editor.isActive('codeBlock') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                        title="Code Block"
                    >
                        <Code2 className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
                        title="Horizontal Rule"
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Media */}
                <div className="flex items-center gap-1">
                    <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 w-8 p-0 ${editor.isActive('link') ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900'}`}
                                title="Add Link"
                            >
                                <LinkIcon className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Link</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="link-url">URL</Label>
                                    <Input
                                        id="link-url"
                                        value={linkUrl}
                                        onChange={(e) => setLinkUrl(e.target.value)}
                                        placeholder="https://example.com"
                                        className="focus-visible:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={addLink} className="bg-blue-600 hover:bg-blue-700">
                                        Add Link
                                    </Button>
                                </div>
                                {editor.isActive('link') && (
                                    <div className="pt-2 border-t">
                                        <Button variant="outline" size="sm" onClick={removeLink} className="text-red-600 hover:text-red-800">
                                            Remove Link
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
                                title="Add Image"
                            >
                                <ImageIcon className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Image</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="image-url">Image URL</Label>
                                    <Input
                                        id="image-url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="focus-visible:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={addImage} className="bg-blue-600 hover:bg-blue-700">
                                        Add Image
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* History */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Undo"
                    >
                        <Undo className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Redo"
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    )
}