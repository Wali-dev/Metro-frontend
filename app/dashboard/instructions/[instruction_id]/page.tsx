

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { api } from '@/app/services/api';
import { Instruction, Step } from '@/app/interfaces/interfaces';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit2, GripVertical, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import TiptapEditor from '@/components/custom/Tiptap';
import { Textarea } from '@/components/ui/textarea';
import { useParams, useSearchParams } from 'next/navigation';

import { useInstructionStore } from '@/app/store/instructionStore';

// DnD Kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ScrollArea } from '@/components/ui/scroll-area';

// Skeleton Component
const SkeletonCard = () => (
  <div className="w-full p-6 border rounded-lg bg-card animate-pulse">
    <div className="h-4 bg-muted rounded w-1/4 mb-3"></div>
    <div className="h-6 bg-muted rounded w-3/4"></div>
  </div>
);

const Page = () => {

  const { instruction_id } = useParams(); // Instruction ID from URL params

  const { selectedInstruction } = useInstructionStore();

  const [instruction, setInstruction] = useState<Instruction>({
    _id: '',
    user_id: '',
    title: '',
    description: '',
    format_type: '',
    is_published: false,
    views_count: 0,
    banner_image: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    steps: [],
    theme_settings: { theme: 'modern' },
  });

  const [isLoading, setIsLoading] = useState(true); // Global loading state

  // Initialize sensors once
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useEffect(() => {
    if (!instruction_id) return;
    const found = selectedInstruction;;
    if (found) setInstruction(found);
    setIsLoading(false);
  }, [instruction_id, instruction]);

  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete step dialog state
  const [stepToDeleteIndex, setStepToDeleteIndex] = useState<number | null>(null);
  const [isDeleteStepDialogOpen, setIsDeleteStepDialogOpen] = useState(false);
  const [isDeletingStep, setIsDeletingStep] = useState(false);

  // === DRAG & DROP HANDLER ===
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = Number(active.id);
    const newIndex = Number(over.id);

    const newSteps = arrayMove(instruction.steps || [], oldIndex, newIndex);
    const updatedSteps = newSteps.map((step, idx) => ({
      ...step,
      step_order: idx + 1,
    }));

    setInstruction((prev) => ({
      ...prev,
      steps: updatedSteps,
    }));
  };

  // IMAGE UPLOAD
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        handleInstructionChange('banner_image', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    return URL.createObjectURL(file);
  };

  // FORM HANDLERS
  const updateInstruction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log('Instruction data:', instruction);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating instruction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      console.log('Saving draft:', instruction);
      const id: string = instruction._id ?? '';
      const response = await api.updateInstructions(id, instruction);
      console.log(response);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      console.log('Publishing:', instruction);
      const id: string = instruction._id ?? '';
      const publishedInstructions = {
        ...instruction,
        is_published: true,
      };
      const response = await api.updateInstructions(id, publishedInstructions);
      console.log(response);
    } catch (error) {
      console.error('Error publishing:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleInstructionChange = (
    field: keyof Instruction,
    value: string | boolean | object
  ) => {
    setInstruction((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveSteps = async () => {
    try {
      console.log('Saving steps:', instruction.steps);
      const response = await api.saveSteps(instruction);
      console.log(response);
    } catch (error) {
      console.error('Error saving steps:', error);
    }
  };

  // STEP DIALOG STATES (Add)
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepDescription, setNewStepDescription] = useState('');
  const [isAddStepDialogOpen, setIsAddStepDialogOpen] = useState(false);

  const handleAddStepFromDialog = () => {
    const newStep: Step = {
      step_order: (instruction.steps?.length || 0) + 1,
      title: newStepTitle,
      description: newStepDescription,
      image_url: '',
      video_url: '',
    };

    setInstruction((prev) => ({
      ...prev,
      steps: [...(prev.steps || []), newStep],
    }));

    setNewStepTitle('');
    setNewStepDescription('');
    setIsAddStepDialogOpen(false);
  };

  // STEP DIALOG STATES (Edit)
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);
  const [editingStepTitle, setEditingStepTitle] = useState('');
  const [editingStepDescription, setEditingStepDescription] = useState('');
  const [isEditStepDialogOpen, setIsEditStepDialogOpen] = useState(false);

  const handleEditStep = (index: number) => {
    const step = instruction.steps![index];
    setEditingStepIndex(index);
    setEditingStepTitle(step.title);
    setEditingStepDescription(step?.description || '');
    setIsEditStepDialogOpen(true);
  };

  const handleSaveEditedStep = () => {
    if (editingStepIndex === null) return;
    setInstruction((prev) => ({
      ...prev,
      steps: prev.steps!.map((step, idx) =>
        idx === editingStepIndex
          ? {
            ...step,
            title: editingStepTitle,
            description: editingStepDescription,
          }
          : step
      ),
    }));
    setIsEditStepDialogOpen(false);
    setEditingStepIndex(null);
  };

  // Delete step: open dialog
  const handleOpenDeleteStepDialog = (index: number) => {
    setStepToDeleteIndex(index);
    setIsDeleteStepDialogOpen(true);
  };

  // Confirm delete
  const handleConfirmDeleteStep = async () => {
    if (stepToDeleteIndex === null) return;
    setIsDeletingStep(true);
    try {
      const step = instruction.steps![stepToDeleteIndex];
      // If step has _id (server-side), call API. Adjust API signature if necessary.
      if ((step as Step)._id) {
        try {
          // Adjust the api call to match your backend: api.deleteStep(instructionId, stepId)
          if (step._id) {
            await api.deleteStep(step._id);
          } else {
            console.error('Step ID is undefined, cannot delete step.');
          }
        } catch (apiErr) {
          console.error('API error deleting step, continuing to remove locally:', apiErr);
        }
      }
      // remove locally and re-order step_order
      setInstruction((prev) => {
        const nextSteps = (prev.steps || []).filter((_, i) => i !== stepToDeleteIndex);
        const reordered = nextSteps.map((s, idx) => ({ ...s, step_order: idx + 1 }));
        return { ...prev, steps: reordered };
      });
      setStepToDeleteIndex(null);
      setIsDeleteStepDialogOpen(false);
    } catch (error) {
      console.error('Error deleting step:', error);
    } finally {
      setIsDeletingStep(false);
    }
  };

  // SortableStepItem component (drag + edit + delete button)
  const SortableStepItem = ({
    id,
    step,
    index,
    onEdit,
    onDelete,
  }: {
    id: string;
    step: Step;
    index: number;
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 10 : 'auto',
    };

    return (
      <Card
        ref={setNodeRef}
        style={style}
        className={`relative overflow-hidden transition-all duration-200 ${isDragging ? 'shadow-xl scale-[1.02] z-10' : 'hover:shadow-md'}`}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute right-12 top-3 cursor-grab active:cursor-grabbing p-1.5 rounded hover:bg-gray-100 transition-colors"
          onClick={(e) => e.stopPropagation()}
          aria-label="Drag to reorder step"
        >
          <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </div>

        {/* Delete Button */}
        <div
          className="absolute right-3 top-3 p-1.5 rounded hover:bg-gray-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // prevent opening edit dialog
            onDelete(index);
          }}
          role="button"
          aria-label="Delete step"
        >
          <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
        </div>

        {/* Clickable Card Body */}
        <div className="px-6 py-2 cursor-pointer" onClick={() => onEdit(index)}>
          <CardContent className="p-0 space-y-1">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Step {step.step_order}
            </div>
            <Label className="text-lg font-semibold leading-tight">{step?.title || 'Untitled Step'}</Label>
          </CardContent>
        </div>
      </Card>
    );
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex w-full items-center p-4">
          <div className="flex gap-4 ml-auto">
            <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
            <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-8 w-1/3 bg-muted animate-pulse rounded"></div>
          <div className="h-6 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-6 w-2/3 bg-muted animate-pulse rounded"></div>
        </div>

        <div className="h-12 w-full bg-muted animate-pulse rounded"></div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex w-full items-center p-4">
        <div className="flex gap-4 ml-auto">
          <Button onClick={handleSaveDraft} disabled={isSaving} variant="outline">
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button onClick={handlePublish} disabled={isPublishing} variant="default">
            {isPublishing ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Instruction Details Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Title</label>
            <p className="text-lg font-semibold">{instruction.title || 'Untitled Instruction'}</p>
          </div>
          <div className="flex items-center gap-2">
            <CardAction>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                  <form onSubmit={updateInstruction}>
                    <DialogHeader>
                      <DialogTitle>Edit Instructions</DialogTitle>
                      <DialogDescription>Click save when you&apos;re done.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      {/* Title */}
                      <div className="grid gap-3">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="How to install node js"
                          value={instruction.title}
                          onChange={(e) => handleInstructionChange('title', e.target.value)}
                          required
                        />
                      </div>

                      {/* Description */}
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={instruction.description || ''}
                          onChange={(e) => handleInstructionChange('description', e.target.value)}
                          placeholder="Write your instruction description here..."
                          rows={4}
                        />
                      </div>

                      {/* Format Type */}
                      <div className="grid gap-3">
                        <Label>Type *</Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" type="button" className="w-full justify-start">
                              {instruction.format_type === 'blog' ? 'Blog' : 'Flowchart'}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup
                              value={instruction.format_type}
                              onValueChange={(value) => handleInstructionChange('format_type', value)}
                            >
                              <DropdownMenuRadioItem value="blog">Blog</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="flowchart">Flowchart</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Published Status Toggle */}
                      <div className="grid gap-3">
                        <Label>Publish Status</Label>
                        <div className="flex items-center gap-3">
                          <Switch
                            id="is_published"
                            checked={instruction.is_published}
                            onCheckedChange={(checked) =>
                              handleInstructionChange('is_published', checked)
                            }
                          />
                          <Label htmlFor="is_published" className="cursor-pointer">
                            {instruction.is_published ? 'Published' : 'Draft'}
                          </Label>
                        </div>
                      </div>

                      {/* Banner Image */}
                      <div className="grid gap-3">
                        <Label htmlFor="banner_image">Banner Image URL</Label>
                        <Input
                          id="banner_image"
                          value={instruction.banner_image || ''}
                          onChange={(e) => handleInstructionChange('banner_image', e.target.value)}
                        />

                        <div className="grid gap-2">
                          <Label>Upload Image</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="cursor-pointer"
                          />
                          {instruction.banner_image && (
                            <div className="mt-2">
                              <Label>Image Preview</Label>
                              <div className="mt-1 border rounded-md p-2">
                                <Image
                                  src={instruction.banner_image}
                                  width={200}
                                  height={200}
                                  alt="Banner preview"
                                  className="w-full h-32 object-cover rounded-md"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Theme Settings */}
                      <div className="grid gap-3">
                        <Label>Theme</Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" type="button" className="w-full justify-start">
                              {instruction.theme_settings?.theme || 'Select theme'}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup
                              value={instruction.theme_settings?.theme || ''}
                              onValueChange={(value) =>
                                handleInstructionChange('theme_settings', { theme: value })
                              }
                            >
                              <DropdownMenuRadioItem value="modern">Modern</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="elegant">Elegant</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="outline" type="button">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Description</label>
            <div
              className="text-gray-600 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: instruction.description || '<em>No description provided.</em>',
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 mr-2">Status</label>
            <Badge
              variant="outline"
              className={`px-2 py-1 capitalize ${instruction.is_published
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
            >
              {instruction.is_published ? 'Published' : 'Draft'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Add New Step Button (wide dialog with nice scrollbar) */}
      <div>
        <Dialog open={isAddStepDialogOpen} onOpenChange={setIsAddStepDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              + Add New Step
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90vw]  max-h-[90vh] overflow-hidden p-0">
            <ScrollArea className="h-[85vh] px-6 py-4">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Add Step</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Fill the title and description, then click Add.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-6">
                <div className="grid gap-3">
                  <Label htmlFor="stepTitle">Title *</Label>
                  <Input
                    id="stepTitle"
                    placeholder="Enter step title"
                    value={newStepTitle}
                    onChange={(e) => setNewStepTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label>Description</Label>
                  <TiptapEditor
                    content={newStepDescription}
                    onChange={(content) => setNewStepDescription(content)}
                    placeholder="Write step description here..."
                  />
                </div>
              </div>

              <DialogFooter className="sticky bottom-0 bg-white py-3 border-t flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="button" onClick={handleAddStepFromDialog}>
                  Add Step
                </Button>
              </DialogFooter>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* DRAGGABLE STEPS LIST */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={instruction.steps?.map((_, index) => String(index)) || []} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {instruction.steps && instruction.steps.length > 0 ? (
              instruction.steps.map((step, index) => (
                <SortableStepItem
                  key={index}
                  id={String(index)}
                  index={index}
                  step={step}
                  onEdit={(i) => handleEditStep(i)}
                  onDelete={(i) => handleOpenDeleteStepDialog(i)}
                />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No steps yet. Click “+ Add New Step” to get started.</p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Edit Step Dialog */}
      <Dialog open={isEditStepDialogOpen} onOpenChange={setIsEditStepDialogOpen}>
        <DialogContent className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Step</DialogTitle>
            <DialogDescription>Edit the step details and click Save.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="editStepTitle">Title *</Label>
              <Input
                id="editStepTitle"
                placeholder="Step title"
                value={editingStepTitle}
                onChange={(e) => setEditingStepTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label>Description</Label>
              <TiptapEditor
                content={editingStepDescription}
                onChange={(content) => setEditingStepDescription(content)}
                placeholder="Step description..."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveEditedStep}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Step Confirmation Dialog */}
      <Dialog open={isDeleteStepDialogOpen} onOpenChange={setIsDeleteStepDialogOpen}>
        <DialogContent className="w-[420px]">
          <DialogHeader>
            <DialogTitle>Delete step</DialogTitle>
            <DialogDescription>Are you sure you want to delete this step? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleConfirmDeleteStep}
              disabled={isDeletingStep}
            >
              {isDeletingStep ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Steps Button */}
      {(instruction.steps || []).length > 0 && (
        <div className="flex justify-end">
          <Button onClick={saveSteps} variant="default">
            Save All Steps
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
