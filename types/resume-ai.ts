import { Analysis } from "./analysis";

export interface InterviewQA {
  question: string;
  answer: string;
}

export interface InterviewPrep {
  hrQuestions?: InterviewQA[];
  technicalQuestions?: InterviewQA[];
  resumeQuestions?: InterviewQA[];
}

export interface ResumeAIState {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;

  analysis: Analysis | null;
  setAnalysis: React.Dispatch<React.SetStateAction<Analysis | null>>;

  improvedResume: string;
  setImprovedResume: React.Dispatch<React.SetStateAction<string>>;

  coverLetter: string;
  setCoverLetter: React.Dispatch<React.SetStateAction<string>>;

  interview: InterviewPrep | null;
  setInterview: React.Dispatch<
    React.SetStateAction<InterviewPrep | null>
  >;

  jobDescription: string;
  setJobDescription: React.Dispatch<
    React.SetStateAction<string>
  >;

  loading: boolean;
  improving: boolean;
  coverLoading: boolean;
  interviewLoading: boolean;

  error: string;

  handleAnalyseResume: () => Promise<void>;
  handleImproveResume: () => Promise<void>;
  handleGenerateCoverLetter: () => Promise<void>;
  handleInterviewPrep: () => Promise<void>;

  clearResults: () => void;
}