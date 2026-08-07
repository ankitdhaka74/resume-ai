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
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
      <h2 className="mb-6 text-2xl font-bold">
        Monthly Analyses
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.monthly}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}