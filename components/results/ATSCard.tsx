"use client";

import { BarChart3, CheckCircle, XCircle } from "lucide-react";
import { Analysis } from "@/types/analysis";
import ScoreGauge from "@/components/ScoreGauge";
import ScoreBreakdown from "@/components/ScoreBreakdown";

interface ATSCardProps {
  analysis: Analysis | null;
}

export default function ATSCard({ analysis }: ATSCardProps) {
  if (!analysis) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            ATS Analysis
          </h2>
        </div>

        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="text-center">
            <BarChart3 className="mx-auto mb-3 h-12 w-12 text-slate-400" />
            <p className="font-medium text-slate-600 dark:text-slate-300">
              No analysis available
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Upload and analyze your resume to view the ATS report.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <BarChart3 className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          ATS Analysis
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ScoreGauge score={analysis.atsScore} title="ATS Score" />

        {analysis.jobMatch !== undefined && (
          <ScoreGauge
            score={analysis.jobMatch}
            title="Job Match"
          />
        )}
      </div>

      {analysis.scoreBreakdown && (
        <div className="mt-8">
          <ScoreBreakdown breakdown={analysis.scoreBreakdown} />
        </div>
      )}

      {analysis.summary && (
        <div className="mt-8 rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
          <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
            AI Summary
          </h3>

          <p className="leading-7 text-slate-700 dark:text-slate-300">
            {analysis.summary}
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-950">
          <h3 className="mb-4 font-semibold text-green-700 dark:text-green-300">
            Strengths
          </h3>

          <ul className="space-y-2">
            {analysis.strengths?.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
              >
                <CheckCircle className="mt-1 h-4 w-4 text-green-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-red-50 p-5 dark:bg-red-950">
          <h3 className="mb-4 font-semibold text-red-700 dark:text-red-300">
            Weaknesses
          </h3>

          <ul className="space-y-2">
            {analysis.weaknesses?.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
              >
                <XCircle className="mt-1 h-4 w-4 text-red-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}