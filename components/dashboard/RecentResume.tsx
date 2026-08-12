"use client";

import { FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import useDashboard from "@/hooks/useDashboard";

export default function RecentResume() {
  const { data, loading } = useDashboard();

  // Loading state
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="h-5 w-36 animate-pulse rounded bg-slate-100" />
            <div className="mt-2 h-3 w-48 animate-pulse rounded bg-slate-100" />
          </div>

          <div className="h-8 w-16 animate-pulse rounded-full bg-slate-100" />
        </div>

        <div className="h-20 animate-pulse rounded-xl bg-slate-50" />
      </div>
    );
  }

  // No resume state
  if (!data.latestResume) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <FileText
                  size={16}
                  className="text-blue-600"
                />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Recent Resume
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Your latest resume analysis
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600">
            Latest
          </span>
        </div>

        {/* Empty state */}
        <div className="flex min-h-[90px] items-center justify-center rounded-xl bg-slate-50">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
              <FileText
                size={17}
                className="text-slate-400"
              />
            </div>

            <p className="text-sm font-semibold text-slate-600">
              No resume analyzed yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Upload and analyze a resume to see it here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Resume available
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <FileText
                size={16}
                className="text-blue-600"
              />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Recent Resume
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Your latest resume analysis
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600">
          Latest
        </span>
      </div>

      {/* Resume card */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30">
        {/* File information */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <FileText
              size={21}
              className="text-blue-600"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {data.latestResume.fileName}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Analyzed{" "}
              {new Date(
                data.latestResume.createdAt
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Score + link */}
        <div className="flex shrink-0 items-center gap-4">
          <div className="text-right">
            <p className="text-xl font-bold text-blue-600">
              {data.latestResume.atsScore}%
            </p>

            <p className="text-[10px] font-medium text-slate-400">
              ATS Score
            </p>
          </div>

          <Link
            href={`/history/${data.latestResume.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            title="View analysis"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}