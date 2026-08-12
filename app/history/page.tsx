"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();

        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          setHistory([]);
          console.error("History API error:", data);
        }
      } catch (error) {
        console.error("History loading error:", error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">Resume History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-slate-500">No resume history found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-5 shadow"
            >
              <h2 className="font-semibold">{item.fileName}</h2>

              <p className="mt-2 text-slate-600">
                ATS Score: {item.atsScore}
              </p>

              <p className="text-sm text-slate-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}