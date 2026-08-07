"use client";

import { Lightbulb } from "lucide-react";
import useDashboard from "@/hooks/useDashboard";

export default function Suggestions() {
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        Loading suggestions...
      </div>
    );
  }

  if (!data.latestResume) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
          <Lightbulb className="text-yellow-500" />
          Suggestions
        </h2>

        <p className="text-slate-500">
          Analyze your first resume to receive AI suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <Lightbulb className="text-yellow-500" />
        AI Summary
      </h2>

      <div className="rounded-xl bg-slate-50 p-5 leading-7 text-slate-700">
        {data.latestResume.summary}
      </div>
    </div>
  );
}