"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Eye,
  Trash2,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

interface HistoryItem {
  id: string;
  fileName: string;
  atsScore: number;
  jobMatch: number | null;
  summary?: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/history", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to load history."
        );
      }

      if (Array.isArray(data)) {
        setHistory(data);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("History loading error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load history."
      );

      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume analysis?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await fetch(`/api/history/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to delete resume."
        );
      }

      setHistory((current) =>
        current.filter((item) => item.id !== id)
      );

      toast.success("Resume analysis deleted.");
    } catch (error) {
      console.error("Delete history error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete resume."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <FileText
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Resume History
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage your previous resume analyses.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-xl bg-slate-100"
                />
              ))}

            </div>
          </div>
        ) : history.length === 0 ? (

          /* Empty State */
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <FileText
                size={25}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No resume history found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Analyze a resume and your analysis will appear here.
            </p>

            <Link
              href="/upload"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Upload Resume
            </Link>

          </div>
        ) : (

          /* History List */
          <div className="space-y-4">

            {history.map((item) => (

              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* Resume information */}
                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <FileText
                        size={22}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0">

                      <h2 className="truncate text-base font-semibold text-slate-900">
                        {item.fileName}
                      </h2>

                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <Calendar size={13} />

                        {new Date(
                          item.createdAt
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>

                    </div>
                  </div>

                  {/* Score + Actions */}
                  <div className="flex items-center justify-between gap-6 lg:justify-end">

                    {/* ATS */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">
                        {item.atsScore}%
                      </p>

                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        ATS Score
                      </p>
                    </div>

                    {/* Job Match */}
                    {item.jobMatch !== null && (
                      <div className="hidden text-right sm:block">
                        <p className="text-xl font-bold text-emerald-600">
                          {item.jobMatch}%
                        </p>

                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                          Job Match
                        </p>
                      </div>
                    )}

                    {/* View */}
                    <Link
                      href={`/history/${item.id}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      title="View analysis"
                    >
                      <Eye size={18} />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      disabled={deletingId === item.id}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-white text-red-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete analysis"
                    >
                      {deletingId === item.id ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>

                  </div>
                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </main>
  );
}