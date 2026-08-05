"use client";

import { Copy, Download, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadInterviewPdf } from "@/lib/pdf";
import { toast } from "sonner";
import { InterviewPrep } from "@/types/resume-ai";

interface InterviewCardProps {
  interview: InterviewPrep | null;
}

export default function InterviewCard({
  interview,
}: InterviewCardProps) {
  const copyInterview = async () => {
    if (!interview) return;

    const text = [
      "HR Questions",
      ...(interview.hrQuestions ?? []).map(
        (q, i) =>
          `Q${i + 1}. ${q.question}\nAnswer: ${q.answer}`
      ),

      "",

      "Technical Questions",
      ...(interview.technicalQuestions ?? []).map(
        (q, i) =>
          `Q${i + 1}. ${q.question}\nAnswer: ${q.answer}`
      ),

      "",

      "Resume Questions",
      ...(interview.resumeQuestions ?? []).map(
        (q, i) =>
          `Q${i + 1}. ${q.question}\nAnswer: ${q.answer}`
      ),
    ].join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Interview preparation copied!");
    } catch {
      toast.error("Failed to copy.");
    }
  };

  if (!interview) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-3">
          <Mic className="h-6 w-6 text-blue-600" />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            AI Interview Preparation
          </h2>
        </div>

        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="text-center">
            <Mic className="mx-auto mb-4 h-12 w-12 text-slate-400" />

            <p className="font-semibold text-slate-700 dark:text-slate-300">
              No interview preparation yet
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Generate interview questions based on your resume.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sections = [
    {
      title: "HR Questions",
      data: interview.hrQuestions,
    },
    {
      title: "Technical Questions",
      data: interview.technicalQuestions,
    },
    {
      title: "Resume Questions",
      data: interview.resumeQuestions,
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mic className="h-6 w-6 text-blue-600" />

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            AI Interview Preparation
          </h2>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={copyInterview}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>

          <Button onClick={() => downloadInterviewPdf(interview)}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      <div className="max-h-[500px] space-y-6 overflow-y-auto">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border bg-slate-50 p-5 dark:bg-slate-800"
          >
            <h3 className="mb-4 text-lg font-semibold text-blue-600">
              {section.title}
            </h3>

            <div className="space-y-5">
              {section.data?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900"
                >
                  <p className="font-semibold">
                    Q{index + 1}. {item.question}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    <strong>Suggested Answer:</strong>
                    <br />
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}