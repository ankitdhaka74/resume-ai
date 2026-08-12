"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Upload,
  History,
  User,
  Settings,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Resume",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-[#0b1630] px-5 py-6 text-white">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Resume<span className="text-blue-400">AI</span>
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          AI Resume Coach
        </p>
      </div>

      {/* Menu */}
      <div>
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.title}
                href={link.href}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-5 w-5 text-slate-400 transition group-hover:text-blue-400" />

                {link.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Coach Card */}
      <div className="mt-auto rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 shadow-lg">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
          ✨
        </div>

        <h3 className="text-sm font-bold">
          AI Resume Coach
        </h3>

        <p className="mt-1 text-xs leading-5 text-blue-100">
          Improve your resume and increase your ATS score.
        </p>

        <Link
          href="/upload"
          className="mt-4 block rounded-lg bg-white py-2 text-center text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Analyze Resume
        </Link>
      </div>
    </aside>
  );
}