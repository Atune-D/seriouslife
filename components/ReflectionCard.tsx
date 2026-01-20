'use client';

import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { saveReflection } from '@/lib/api-client';

interface Reflection {
  energy: string;
  mood?: string | null;
  did?: string | null;
  blocked?: string | null;
}

interface ReflectionCardProps {
  date: string;
  initialData?: Reflection | null;
  onUpdate?: () => void;
}

export function ReflectionCard({ date, initialData, onUpdate }: ReflectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [energy, setEnergy] = useState(initialData?.energy || 'medium');
  const [mood, setMood] = useState(initialData?.mood || '');
  const [did, setDid] = useState(initialData?.did || '');
  const [blocked, setBlocked] = useState(initialData?.blocked || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveReflection({
        date,
        energy,
        mood: mood || undefined,
        did: did || undefined,
        blocked: blocked || undefined,
      });
      onUpdate?.();
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to save reflection:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left flex items-center justify-between"
      >
        <h2 className="text-xl font-semibold">
          Nightly Reflection {initialData && '✓'}
        </h2>
        <span className="text-2xl">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Energy Level */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Energy Level <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => setEnergy(level)}
                  className={`flex-1 px-4 py-2 rounded-lg capitalize transition ${
                    energy === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm font-medium mb-2">Mood</label>
            <div className="flex gap-2">
              {['down', 'neutral', 'good'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`flex-1 px-4 py-2 rounded-lg capitalize transition ${
                    mood === m
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* What did you accomplish? */}
          <div>
            <label className="block text-sm font-medium mb-2">
              What did you accomplish?
            </label>
            <textarea
              value={did}
              onChange={(e) => setDid(e.target.value)}
              placeholder="Logged KPIs, made progress on tasks..."
              className="w-full px-3 py-2 border rounded-md resize-none"
              rows={2}
            />
          </div>

          {/* What blocked you? */}
          <div>
            <label className="block text-sm font-medium mb-2">
              What blocked you?
            </label>
            <textarea
              value={blocked}
              onChange={(e) => setBlocked(e.target.value)}
              placeholder="Overthinking, distractions..."
              className="w-full px-3 py-2 border rounded-md resize-none"
              rows={2}
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full"
          >
            {isSaving ? 'Saving...' : 'Save Reflection'}
          </Button>
        </div>
      )}
    </Card>
  );
}


