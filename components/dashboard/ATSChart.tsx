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
  defs,
} from "recharts";

export default function ATSChart() {
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:shadow-xl dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            ATS Score Trend
          </h2>

          <p className="text-sm text-slate-500">
            Your ATS performance over time
          </p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
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
                  stopOpacity={0.45}
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
            />

            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,.15)",
              }}
            />

            <Area
              type="monotone"
              dataKey="ats"
              stroke="#2563eb"
              strokeWidth={4}
              fill="url(#atsGradient)"
              animationDuration={1200}
              dot={{
                r: 6,
                strokeWidth: 3,
                fill: "#fff",
                stroke: "#2563eb",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}