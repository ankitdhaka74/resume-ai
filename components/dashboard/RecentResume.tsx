"use client";

import { FileText } from "lucide-react";

export default function RecentResume() {
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
              Resume.pdf
            </p>

            <p className="text-sm text-slate-500">
              ATS Score 92
            </p>
          </div>
        </div>

        <span className="text-sm text-slate-400">
          Today
        </span>
      </div>
    </div>
  );
}