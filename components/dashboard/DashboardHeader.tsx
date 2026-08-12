"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Upload,
  History,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

export default function DashboardHeader() {
  const { data: session } = useSession();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}
      <div>
        <p className="text-lg text-slate-500">
          {greeting} 👋
        </p>

        <h1 className="mt-1 text-5xl font-extrabold tracking-tight text-slate-900">
          Welcome back,
          <span className="text-blue-600">
            {" "}
            {session?.user?.name ?? "User"}
          </span>
        </h1>

        <p className="mt-3 text-slate-500">
          {today}
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-3">

        <Link
          href="/upload"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Upload className="h-5 w-5" />
          Upload Resume
        </Link>

        <Link
          href="/history"
          className="inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-semibold transition hover:bg-slate-50 dark:bg-slate-900"
        >
          <History className="h-5 w-5" />
          History
        </Link>

        <button
          className="rounded-xl border p-3 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Sun className="h-5 w-5" />
        </button>

        <button
          onClick={() => signOut()}
          className="inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-semibold transition hover:bg-red-50 dark:bg-slate-900"
        >
          <LogOut className="h-5 w-5 text-red-600" />
          Logout
        </button>

      </div>
    </div>
  );
}