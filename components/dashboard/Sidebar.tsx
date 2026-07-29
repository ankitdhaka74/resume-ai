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
    <aside className="w-64 h-screen bg-white border-r p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        ResumeAI
      </h1>

      <nav className="space-y-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition"
            >
              <Icon size={20} />
              {link.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}