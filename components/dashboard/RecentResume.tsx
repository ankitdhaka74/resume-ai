"use client";

import { FileText } from "lucide-react";
import useDashboard from "@/hooks/useDashboard";

export default function RecentResume() {
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        Loading recent resume...
      </div>
    );
  }

  if (!data.latestResume) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">
          Recent Resume
        </h2>

        <p className="text-slate-500">
          No resume analyzed yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Recent Resume
      </h2>

      <div className="flex items-center justify-between rounded-xl border p-4">
        <div className="flex items-center gap-4">
          <FileText className="text-blue-600" />

          <div>
            <p className="font-semibold">
              {data.latestResume.fileName}
            </p>

            <p className="text-sm text-slate-500">
              ATS Score {data.latestResume.atsScore}
            </p>
          </div>
        </div>

        <span className="text-sm text-slate-400">
          {new Date(data.latestResume.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}