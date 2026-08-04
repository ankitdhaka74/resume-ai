export interface Analysis {
  summary?: string;
  atsScore: number;
  jobMatch?: number;

  scoreBreakdown?: {
    content: number;
    skills: number;
    formatting: number;
    experience: number;
    education: number;
  };

  strengths: string[];
  weaknesses: string[];
  matchingSkills?: string[];
  missingSkills?: string[];
  missingKeywords: string[];
  suggestions: string[];
}