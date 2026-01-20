"use client";

import { useMemo, useState } from "react";

const PROMPTS = [
  "What am I avoiding right now?",
  "What is the smallest next step?",
  "Am I moving toward the life I dislike or the life I want?",
  "What matters most that I'm pretending isn't important?",
  "What am I protecting by not acting?",
];

export default function PromptCard() {
  const [seed, setSeed] = useState(0);
  const prompt = useMemo(() => PROMPTS[seed % PROMPTS.length], [seed]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-3">
      <div className="text-sm text-neutral-800">{prompt}</div>
      <div className="mt-2 flex justify-end">
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="rounded-xl px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
        >
          New prompt
        </button>
      </div>
    </div>
  );
}
