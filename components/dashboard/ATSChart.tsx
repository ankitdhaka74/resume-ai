"use client";

import useDashboard from "@/hooks/useDashboard";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ATSChart() {
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <span className="text-sm text-blue-600">⌁</span>
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              ATS Score Trend
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Your ATS performance over time
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600">
          ATS
        </span>
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        {data.chart.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400">
                ▥
              </div>

              <p className="text-sm font-semibold text-slate-600">
                No analysis data yet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Upload a resume to see your ATS trend
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={data.chart}>
              <defs>
                <linearGradient
                  id="atsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 11,
                  fill: "#64748b",
                }}
              />

              <YAxis
                domain={[0, 100]}
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

              <Area
                type="monotone"
                dataKey="ats"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#atsGradient)"
                animationDuration={1000}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#fff",
                  stroke: "#2563eb",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}