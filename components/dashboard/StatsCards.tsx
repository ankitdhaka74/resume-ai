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
      value: data.total,
      suffix: "",
      icon: FileText,
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      iconColor: "text-blue-600",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Average ATS",
      value: data.averageATS,
      suffix: "%",
      icon: BarChart3,
      iconBg: "bg-green-100 dark:bg-green-900/40",
      iconColor: "text-green-600",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Best ATS",
      value: data.bestATS,
      suffix: "%",
      icon: Sparkles,
      iconBg: "bg-purple-100 dark:bg-purple-900/40",
      iconColor: "text-purple-600",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Downloads",
      value: 0,
      suffix: "",
      icon: Download,
      iconBg: "bg-orange-100 dark:bg-orange-900/40",
      iconColor: "text-orange-600",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900"
          >
            {/* Gradient Strip */}
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.gradient}`}
            />

            <div className="mb-6 flex items-center justify-between">
              <div
                className={`rounded-2xl p-3 ${card.iconBg}`}
              >
                <Icon
                  className={`h-7 w-7 ${card.iconColor}`}
                />
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800">
                Live
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {card.title}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
              {loading ? (
                "..."
              ) : (
                <>
                  <CountUp
                    end={card.value}
                    duration={1.5}
                  />
                  {card.suffix}
                </>
              )}
            </h2>
          </div>
        );
      })}
    </div>
  );
}