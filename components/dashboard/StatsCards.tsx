"use client";

import CountUp from "react-countup";
import {
  FileText,
  BarChart3,
  Sparkles,
  Download,
} from "lucide-react";

import useDashboard from "@/hooks/useDashboard";

export default function StatsCards() {
  const { data, loading } = useDashboard();

  const cards = [
    {
      title: "Total Analyses",
      description: "Resumes analyzed so far",
      value: data.total,
      suffix: "",
      icon: FileText,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-t-blue-500",
    },
    {
      title: "Average ATS",
      description: "Average resume score",
      value: data.averageATS,
      suffix: "%",
      icon: BarChart3,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      border: "border-t-emerald-500",
    },
    {
      title: "Best ATS",
      description: "Highest score achieved",
      value: data.bestATS,
      suffix: "%",
      icon: Sparkles,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      border: "border-t-purple-500",
    },
    {
      title: "Downloads",
      description: "Generated files downloaded",
      value: 0,
      suffix: "",
      icon: Download,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      border: "border-t-orange-500",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl border border-slate-200 border-t-2 ${card.border} bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon
                  size={21}
                  className={card.iconColor}
                />
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                ● Active
              </span>
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {loading ? (
                  "..."
                ) : (
                  <>
                    <CountUp
                      end={card.value}
                      duration={1.2}
                    />
                    {card.suffix}
                  </>
                )}
              </h2>

              <p className="mt-1 text-[11px] text-slate-400">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}