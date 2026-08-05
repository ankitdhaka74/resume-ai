"use client";

import { useState } from "react";
import { Analysis } from "@/types/analysis";
import { toast } from "sonner";

export interface InterviewQA {
  question: string;
  answer: string;
}

export interface InterviewPrep {
  hrQuestions?: InterviewQA[];
  technicalQuestions?: InterviewQA[];
  resumeQuestions?: InterviewQA[];
}

export function useResumeAI() {
  const [file, setFile] = useState<File | null>(null);

  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const [improvedResume, setImprovedResume] = useState("");

  const [coverLetter, setCoverLetter] = useState("");

  const [interview, setInterview] = useState<InterviewPrep | null>(null);

  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [improving, setImproving] = useState(false);

  const [coverLoading, setCoverLoading] = useState(false);

  const [interviewLoading, setInterviewLoading] = useState(false);

  const [error, setError] = useState("");

  const clearResults = () => {
    setAnalysis(null);
    setImprovedResume("");
    setCoverLetter("");
    setInterview(null);
    setJobDescription("");
    setError("");


    toast.success("Results cleared!");
  };

  const handleAnalyseResume = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyse resume.");
      }

      setAnalysis(data.ai);

      toast.success("Resume analyzed successfully!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown Error";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleImproveResume = async () => {
    if (!file) return;

    try {
      setImproving(true);

      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("/api/improve", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to improve resume.");
      }

      setImprovedResume(data.improvedResume);

      toast.success("Resume improved successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to improve resume."
      );
    } finally {
      setImproving(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!file) return;

    if (!jobDescription.trim()) {
      toast.error("Please enter a job description.");
      return;
    }

    try {
      setCoverLoading(true);

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/cover-letter", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to generate cover letter."
        );
      }

      setCoverLetter(data.coverLetter);

      toast.success("Cover letter generated!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate cover letter."
      );
    } finally {
      setCoverLoading(false);
    }
  };

  const handleInterviewPrep = async () => {
    if (!file) return;

    try {
      setInterviewLoading(true);

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/interview", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to generate interview questions."
        );
      }

      setInterview(data.interview);

      toast.success("Interview questions generated!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setInterviewLoading(false);
    }
  };

  return {
    file,
    setFile,

    analysis,
    setAnalysis,

    improvedResume,
    setImprovedResume,

    coverLetter,
    setCoverLetter,

    interview,
    setInterview,

    jobDescription,
    setJobDescription,

    loading,
    setLoading,

    improving,
    setImproving,

    coverLoading,
    setCoverLoading,

    interviewLoading,
    setInterviewLoading,

    error,
    setError,

    clearResults,

    handleAnalyseResume,
    handleImproveResume,
    handleGenerateCoverLetter,
    handleInterviewPrep,
  };
}