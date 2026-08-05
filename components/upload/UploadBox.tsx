"use client";

import UploadHeader from "./UploadHeader";
import UploadDropzone from "./UploadDropzone";
import ActionToolbar from "./ActionToolbar";
import ResultsGrid from "@/components/results/ResultsGrid";
import { useResumeAI } from "@/hooks/useResumeAI";
import JobDescription from "./JobDescription";

export default function UploadBox() {
  const resume = useResumeAI();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      {/* Hero */}
      <UploadHeader />

      {/* Upload Area */}
      <UploadDropzone
        file={resume.file}
        setFile={resume.setFile}
        loading={resume.loading}
      />

      <JobDescription
        value={resume.jobDescription}
        onChange={resume.setJobDescription}
      />    

      {/* Action Buttons */}
      <ActionToolbar
        loading={resume.loading}
        improving={resume.improving}
        coverLoading={resume.coverLoading}
        interviewLoading={resume.interviewLoading}
        disabled={!resume.file}
        onAnalyze={resume.handleAnalyseResume}
        onImprove={resume.handleImproveResume}
        onCoverLetter={resume.handleGenerateCoverLetter}
        onInterview={resume.handleInterviewPrep}
        onClear={resume.clearResults}
      />

      {/* Results */}
      <ResultsGrid
        analysis={resume.analysis}
        improvedResume={resume.improvedResume}
        coverLetter={resume.coverLetter}
        interview={resume.interview}
      />
    </div>
  );
}