"use client";

import {
  FileText,
  BarChart3,
  Sparkles,
  Download,
} from "lucide-react";

const stats = [
  {
    title: "Total Analyses",
    value: "24",
    icon: FileText,
  },
  {
    title: "Average ATS",
    value: "86%",
    icon: BarChart3,
  },
  {
    title: "AI Generations",
    value: "41",
    icon: Sparkles,
  },
  {
    title: "Downloads",
    value: "12",
    icon: Download,
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <Icon className="mb-4 h-8 w-8 text-blue-600" />

            <p className="text-sm text-slate-500">
              {item.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}