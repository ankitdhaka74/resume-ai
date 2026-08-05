"use client";

import { Analysis } from "@/types/analysis";
import { InterviewPrep } from "@/types/resume-ai";

import ATSCard from "./ATSCard";
import ResumeCard from "./ResumeCard";
import CoverLetterCard from "./CoverLetterCard";
import InterviewCard from "./InterviewCard";

interface ResultsGridProps {
  analysis: Analysis | null;
  improvedResume: string;
  coverLetter: string;
  interview: InterviewPrep | null;
}

export default function ResultsGrid({
  analysis,
  improvedResume,
  coverLetter,
  interview,
}: ResultsGridProps) {
  return (
    <div className="mt-10 space-y-8">
      <ATSCard analysis={analysis} />

      <ResumeCard improvedResume={improvedResume} />

      <CoverLetterCard coverLetter={coverLetter} />

      <InterviewCard interview={interview} />
    </div>
  );
}