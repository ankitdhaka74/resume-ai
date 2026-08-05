"use client";

import {
  Search,
  Sparkles,
  FileText,
  Mic,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionToolbarProps {
  loading?: boolean;
  improving?: boolean;
  coverLoading?: boolean;
  interviewLoading?: boolean;
  disabled?: boolean;

  onAnalyze?: () => void;
  onImprove?: () => void;
  onCoverLetter?: () => void;
  onInterview?: () => void;
  onClear?: () => void;
}

export default function ActionToolbar({
  loading = false,
  improving = false,
  coverLoading = false,
  interviewLoading = false,
  disabled = false,

  onAnalyze,
  onImprove,
  onCoverLetter,
  onInterview,
  onClear,
}: ActionToolbarProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Choose an AI feature to enhance your resume.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Analyze */}
        <Button
          className="h-14 rounded-xl font-semibold"
          disabled={disabled || loading}
          onClick={onAnalyze}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Analyze
            </>
          )}
        </Button>

        {/* Improve */}
        <Button
          variant="secondary"
          className="h-14 rounded-xl font-semibold"
          disabled={disabled || improving}
          onClick={onImprove}
        >
          {improving ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Improving...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Improve
            </>
          )}
        </Button>

        {/* Cover Letter */}
        <Button
          variant="secondary"
          className="h-14 rounded-xl font-semibold"
          disabled={disabled || coverLoading}
          onClick={onCoverLetter}
        >
          {coverLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-5 w-5" />
              Cover Letter
            </>
          )}
        </Button>

        {/* Interview */}
        <Button
          variant="secondary"
          className="h-14 rounded-xl font-semibold"
          disabled={disabled || interviewLoading}
          onClick={onInterview}
        >
          {interviewLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Mic className="mr-2 h-5 w-5" />
              Interview Prep
            </>
          )}
        </Button>

        {/* Clear */}
        <Button
          variant="destructive"
          className="h-14 rounded-xl font-semibold"
          onClick={onClear}
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Clear
        </Button>
      </div>

      {disabled && (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
          📄 Upload your resume first to enable all AI features.
        </div>
      )}
    </div>
  );
}