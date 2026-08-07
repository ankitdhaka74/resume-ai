"use client";

import Link from "next/link";
import {
  Upload,
  History,
  User,
  Settings,
} from "lucide-react";

const actions = [
  {
    title: "Upload Resume",
    href: "/upload",
    icon: Upload,
    color: "bg-blue-500",
  },
  {
    title: "History",
    href: "/history",
    icon: History,
    color: "bg-green-500",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    color: "bg-purple-500",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    color: "bg-orange-500",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
      <h2 className="mb-6 text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`mb-4 inline-flex rounded-xl p-3 ${item.color}`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="font-semibold">
                {item.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}