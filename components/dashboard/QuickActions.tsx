"use client";

import Link from "next/link";

import {
  Upload,
  History,
  User,
  Settings,
  ArrowUpRight,
} from "lucide-react";

const actions = [
  {
    title: "Upload Resume",
    description: "Analyze a new resume",
    href: "/upload",
    icon: Upload,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "History",
    description: "View previous analyses",
    href: "/history",
    icon: History,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Profile",
    description: "Manage your profile",
    href: "/profile",
    icon: User,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Settings",
    description: "Manage preferences",
    href: "/settings",
    icon: Settings,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Quickly access frequently used features
        </p>
      </div>

      {/* Actions */}
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.iconBg}`}
                >
                  <Icon
                    size={18}
                    className={action.iconColor}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {action.title}
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-slate-300 transition group-hover:text-blue-600"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}