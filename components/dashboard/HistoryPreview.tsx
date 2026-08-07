"use client";

import { useEffect, useState } from "react";

interface ResumeHistory {
  id: string;
  fileName: string;
  atsScore: number;
  createdAt: string;
}

export default function HistoryPreview() {
  const [history, setHistory] = useState<ResumeHistory[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/history");
      const data = await res.json();
      setHistory(data.slice(0, 5));
    }

    load();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
      <h2 className="mb-6 text-2xl font-bold">
        Recent History
      </h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <p className="font-semibold">
                {item.fileName}
              </p>

              <p className="text-sm text-slate-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">
              {item.atsScore}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}