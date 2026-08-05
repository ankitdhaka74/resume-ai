"use client";

import { Sparkles, BarChart3, PenLine, Mic } from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function UploadHeader() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-5xl font-bold">
            AI Resume Analyzer
          </h1>

          <p className="mt-4 max-w-2xl text-blue-100 text-lg">
            Analyze your resume, improve it with AI, generate professional
            cover letters, and prepare for interviews.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge icon={<BarChart3 size={16} />} text="ATS Score" />
            <Badge icon={<Sparkles size={16} />} text="Resume Rewriter" />
            <Badge icon={<PenLine size={16} />} text="Cover Letter" />
            <Badge icon={<Mic size={16} />} text="Interview Prep" />
          </div>
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
}

function Badge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}