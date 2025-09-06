'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/app/services/api';
import { Instruction, Step } from '@/app/interfaces/interfaces';





const Page = () => {
  const [instruction, setInstruction] = useState<Instruction>({
    _id: "68bc58ae85b4d47a7459d0f8",
    user_id: "68b31beb50e1757d8ddddb5b",
    title: "How to be an 100X developer",
    description: "This instruction guides you through all the essential steps",
    format_type: "blog",
    is_published: false,
    views_count: 0,
    createdAt: "2025-09-06T15:52:14.629Z",
    updatedAt: "2025-09-06T15:52:14.629Z",
    __v: 0,
    steps: []
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // await api.updateInstruction(instruction._id, {
      //   ...instruction,
      //   is_published: false
      // });
      // Handle success
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // await api.updateInstruction(instruction._id, {
      //   ...instruction,
      //   is_published: true
      // });
      // Handle success
    } catch (error) {
      console.error('Error publishing:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddStep = () => {
    const newStep: Step = {
      step_order: (instruction.steps?.length || 0) + 1,
      title: '',
      description: '',
      image_url: '',
      video_url: ''
    };
    setInstruction(prev => ({
      ...prev,
      steps: [...(prev.steps || []), newStep]
    }));
  };

  const handleStepChange = (index: number, field: keyof Step, value: string) => {
    setInstruction(prev => ({
      ...prev,
      steps: (prev.steps || []).map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      )
    }));
  };

  const handleInstructionChange = (field: keyof Instruction, value: string | boolean) => {
    setInstruction(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex w-full items-center p-4">
        <div className="flex gap-4 ml-auto">
          <Button
            onClick={handleSaveDraft}
            disabled={isSaving}
            variant="outline"
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isPublishing}
            variant="default"
          >
            {isPublishing ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Instruction Details */}
      <Card>
        <CardHeader>
          <CardTitle>Instruction Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={instruction.title}
              onChange={(e) => handleInstructionChange('title', e.target.value)}
              placeholder="Enter instruction title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={instruction.description}
              onChange={(e) => handleInstructionChange('description', e.target.value)}
              placeholder="Enter instruction description"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add New Step Button */}
      <div>
        <Button onClick={handleAddStep} variant="outline" className="w-full">
          + Add New Step
        </Button>
      </div>

      {/* Steps List */}
      {(instruction.steps || []).map((step, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Step {step.step_order}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={step.title}
                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                placeholder="Enter step title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={step.description}
                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                placeholder="Enter step description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                value={step.image_url}
                onChange={(e) => handleStepChange(index, 'image_url', e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Video URL</label>
              <Input
                value={step.video_url}
                onChange={(e) => handleStepChange(index, 'video_url', e.target.value)}
                placeholder="Enter video URL"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Page;