'use client';

import React, { useState } from 'react';
import { Card } from './ui/Card';
import { ProgressSlider } from './ui/ProgressSlider';
import { Checkbox } from './ui/Checkbox';
import { Button } from './ui/Button';
import { updateTask, createTaskStep, updateTaskStep, deleteTaskStep } from '@/lib/api-client';

interface TaskStep {
  id: string;
  title: string;
  isDone: boolean;
  position: number;
}

interface Task {
  id: string;
  title: string;
  tinyStart: string;
  progressScore: number;
  status: string;
  resistance: string | null;
  steps: TaskStep[];
  weeklyTheme?: {
    title: string;
  };
}

interface TaskCardProps {
  task: Task;
  onUpdate?: () => void;
}

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [progress, setProgress] = useState(task.progressScore);
  const [showChecklist, setShowChecklist] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [isAddingStep, setIsAddingStep] = useState(false);

  const handleProgressChange = async (newProgress: number) => {
    setProgress(newProgress);
    try {
      await updateTask(task.id, { progress_score: newProgress });
      onUpdate?.();
    } catch (error) {
      console.error('Failed to update progress:', error);
      setProgress(task.progressScore); // Revert on error
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateTask(task.id, { status: newStatus });
      onUpdate?.();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleStepToggle = async (stepId: string, isDone: boolean) => {
    try {
      await updateTaskStep(task.id, stepId, { is_done: isDone });
      onUpdate?.();
    } catch (error) {
      console.error('Failed to update step:', error);
    }
  };

  const handleAddStep = async () => {
    if (!newStepTitle.trim()) return;

    setIsAddingStep(true);
    try {
      await createTaskStep(task.id, newStepTitle);
      setNewStepTitle('');
      onUpdate?.();
    } catch (error) {
      console.error('Failed to create step:', error);
    } finally {
      setIsAddingStep(false);
    }
  };

  const handleDeleteStep = async (stepId: string) => {
    try {
      await deleteTaskStep(task.id, stepId);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to delete step:', error);
    }
  };

  return (
    <Card className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Tiny start: {task.tinyStart}
          </p>
          {task.weeklyTheme && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {task.weeklyTheme.title}
            </p>
          )}
        </div>
        
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          <option value="planned">Planned</option>
          <option value="done">Done</option>
          <option value="skipped">Skipped</option>
        </select>
      </div>

      {/* Progress Slider */}
      <ProgressSlider
        value={progress}
        onChange={handleProgressChange}
        disabled={task.status === 'done'}
      />

      {/* Checklist Section */}
      <div className="border-t pt-4">
        <button
          onClick={() => setShowChecklist(!showChecklist)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          <span>{showChecklist ? '▼' : '▶'}</span>
          Checklist ({task.steps.length} items)
        </button>

        {showChecklist && (
          <div className="mt-3 space-y-2">
            {task.steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                <Checkbox
                  checked={step.isDone}
                  onChange={(checked) => handleStepToggle(step.id, checked)}
                  label={step.title}
                />
                <button
                  onClick={() => handleDeleteStep(step.id)}
                  className="ml-auto text-red-600 hover:text-red-700 text-sm"
                >
                  ×
                </button>
              </div>
            ))}

            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={newStepTitle}
                onChange={(e) => setNewStepTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddStep()}
                placeholder="Add a step..."
                className="flex-1 px-3 py-2 border rounded-md text-sm"
              />
              <Button
                onClick={handleAddStep}
                disabled={!newStepTitle.trim() || isAddingStep}
                size="sm"
              >
                Add
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}


