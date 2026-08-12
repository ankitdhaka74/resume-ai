"use client";

import useDashboard from "@/hooks/useDashboard";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function MonthlyChart() {
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-[350px] animate-pulse rounded-xl bg-slate-50" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
              <span className="text-sm text-purple-600">
                ▥
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Monthly Analyses
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Number of resumes analyzed each month
          </p>
        </div>

        <span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-semibold text-purple-600">
          Analytics
        </span>
      </div>

      <div className="h-[320px]">
        {data.monthly.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400">
                ▥
              </div>

              <p className="text-sm font-semibold text-slate-600">
                No monthly data yet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Analyze a resume to see monthly statistics
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={data.monthly}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 11,
                  fill: "#64748b",
                }}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 11,
                  fill: "#64748b",
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 10px 30px rgba(15, 23, 42, 0.10)",
                }}
              />

              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                fill="#8b5cf6"
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}