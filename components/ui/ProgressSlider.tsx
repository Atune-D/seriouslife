'use client';

import React from 'react';

interface ProgressSliderProps {
  value: number; // 0-10
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function ProgressSlider({ value, onChange, disabled = false }: ProgressSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Progress</span>
        <span className="font-semibold">{value}/10</span>
      </div>
      
      {/* Tick marks UI - visual buttons */}
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => (
          <button
            key={tick}
            type="button"
            onClick={() => !disabled && onChange(tick)}
            disabled={disabled}
            className={`flex-1 h-8 rounded transition-colors ${
              tick <= value
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={`Set progress to ${tick}`}
          />
        ))}
      </div>
      
      {/* Alternative: Range slider */}
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
}


