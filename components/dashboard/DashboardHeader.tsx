"use client";

import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          👋 Welcome Back
        </h1>

        <p className="mt-2 text-slate-500">
          {today}
        </p>
      </div>

      <ThemeToggle />
    </div>
  );
}