"use client";

import { Copy, Download, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadCoverLetterPdf } from "@/lib/pdf";
import { toast } from "sonner";

interface CoverLetterCardProps {
  coverLetter: string;
}

export default function CoverLetterCard({
  coverLetter,
}: CoverLetterCardProps) {
  const copyCoverLetter = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      toast.success("Cover letter copied successfully!");
    } catch {
      toast.error("Failed to copy cover letter.");
    }
  };

  if (!coverLetter) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-3">
          <PenLine className="h-6 w-6 text-blue-600" />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            AI Cover Letter
          </h2>
        </div>

        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="text-center">
            <PenLine className="mx-auto mb-4 h-12 w-12 text-slate-400" />

            <p className="font-semibold text-slate-700 dark:text-slate-300">
              No cover letter generated
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Generate a personalized AI cover letter for your application.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PenLine className="h-6 w-6 text-blue-600" />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            AI Cover Letter
          </h2>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={copyCoverLetter}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>

          <Button onClick={() => downloadCoverLetterPdf(coverLetter)}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto rounded-2xl border bg-slate-50 p-5 dark:bg-slate-800">
        <pre className="whitespace-pre-wrap font-sans leading-7 text-slate-700 dark:text-slate-200">
          {coverLetter}
        </pre>
      </div>
    </div>
  );
}