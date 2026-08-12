"use client";

import { useEffect, useState } from "react";
import {
  History,
  ArrowRight,
  FileText,
} from "lucide-react";
import Link from "next/link";

interface HistoryItem {
  id: string;
  fileName: string;
  atsScore: number;
  jobMatch: number | null;
  createdAt: string;
}

export default function HistoryPreview() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/history");

        const data = await res.json();

        if (!res.ok) {
          console.error("History API Error:", data);
          setHistory([]);
          return;
        }

        if (!Array.isArray(data)) {
          console.error(
            "History API did not return an array:",
            data
          );
          setHistory([]);
          return;
        }

        setHistory(data.slice(0, 5));
      } catch (error) {
        console.error("History Load Error:", error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* Loading */
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <History
                  size={16}
                  className="text-blue-600"
                />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Recent History
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Your recent resume analyses
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-xl bg-slate-50"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">

      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <History
                size={16}
                className="text-blue-600"
              />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Recent History
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Your recent resume analyses
          </p>
        </div>

        <Link
          href="/history"
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* No history */}
      {history.length === 0 ? (
        <div className="flex min-h-[150px] items-center justify-center rounded-xl bg-slate-50">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <FileText
                size={19}
                className="text-slate-400"
              />
            </div>

            <p className="text-sm font-semibold text-slate-600">
              No resume history yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your analyzed resumes will appear here.
            </p>
          </div>
        </div>
      ) : (
        /* History list */
        <div className="space-y-2.5">
          {history.map((item) => (
            <Link
              key={item.id}
              href={`/history/${item.id}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30"
            >
              {/* Resume information */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <FileText
                    size={17}
                    className="text-blue-600"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {item.fileName}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* ATS Score */}
              <div className="flex shrink-0 items-center gap-3">
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    {item.atsScore}%
                  </p>

                  <p className="text-[10px] font-medium text-slate-400">
                    ATS Score
                  </p>
                </div>

                <ArrowRight
                  size={16}
                  className="text-slate-300 transition group-hover:text-blue-600"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}