"use client";

import { Lightbulb } from "lucide-react";

const suggestions = [
  "Add measurable achievements",
  "Include certifications",
  "Improve your professional summary",
];

export default function Suggestions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <Lightbulb className="text-yellow-500" />
        Suggestions
      </h2>

      <ul className="space-y-4">
        {suggestions.map((item) => (
          <li
            key={item}
            className="rounded-xl bg-slate-50 p-4"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}