"use client";

import { useEffect, useMemo, useState } from "react";
import HistoryRow from "./HistoryRow";

interface ResumeHistory {
  id: string;
  fileName: string;
  atsScore: number;
  jobMatch?: number;
  createdAt: string;
}

export default function HistoryTable() {
  const [history, setHistory] = useState<ResumeHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setHistory(data);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  const filteredHistory = useMemo(() => {
    const filtered = history.filter((item) =>
      item.fileName.toLowerCase().includes(search.toLowerCase())
    );

    switch (sort) {
      case "oldest":
        return [...filtered].reverse();

      case "highest":
        return [...filtered].sort(
          (a, b) => b.atsScore - a.atsScore
        );

      case "lowest":
        return [...filtered].sort(
          (a, b) => a.atsScore - b.atsScore
        );

      default:
        return filtered;
    }
  }, [history, search, sort]);

  if (loading) {
    return (
      <div className="rounded-3xl border p-8">
        Loading history...
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="rounded-3xl border p-8 text-center text-slate-500">
        No resume history found.
      </div>
    );
  }

  return (
    <>
      {/* Search & Filter */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="🔍 Search resume..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 md:max-w-sm"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest ATS</option>
          <option value="lowest">Lowest ATS</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Resume</th>
              <th className="p-4">ATS</th>
              <th className="p-4">Job Match</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-slate-500"
                >
                  No matching resumes found.
                </td>
              </tr>
            ) : (
              filteredHistory.map((item) => (
                <HistoryRow
                  key={item.id}
                  history={item}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}