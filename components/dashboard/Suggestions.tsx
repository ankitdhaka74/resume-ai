"use client";

import {
  Lightbulb,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";
import useDashboard from "@/hooks/useDashboard";

export default function Suggestions() {
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-28 animate-pulse rounded-xl bg-slate-50" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <Lightbulb
                size={16}
                className="text-amber-500"
              />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              AI Suggestions
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Personalized resume insights
          </p>
        </div>

        <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-semibold text-amber-600">
          AI
        </span>
      </div>

      {!data.latestResume ? (
        <div className="flex min-h-[90px] items-center justify-center rounded-xl bg-slate-50">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
              <Sparkles
                size={16}
                className="text-blue-500"
              />
            </div>

            <p className="text-sm font-semibold text-slate-600">
              No suggestions yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Analyze your resume to receive personalized AI suggestions.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100">
              <Sparkles
                size={17}
                className="text-amber-600"
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                Resume improvement insight
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {data.latestResume.summary ||
                  "Review your latest resume analysis to see personalized suggestions."}
              </p>

              <Link
                href={`/history/${data.latestResume.id}`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View full analysis
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}