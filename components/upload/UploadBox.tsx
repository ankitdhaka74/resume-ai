"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  XCircle,
  Target,
  AlertTriangle,
  KeyRound,
  Lightbulb,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ScoreGauge from "@/components/ScoreGauge";

interface Analysis {
  summary?: string;
  atsScore: number;
  jobMatch?: number;
  strengths: string[];
  weaknesses: string[];
  matchingSkills?: string[];
  missingSkills?: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setAnalysis(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  const handleAnalyseResume = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log("API Response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyse resume.");
      }

      setAnalysis(data.ai);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown Error";

      alert(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderList = (
    items: string[] | undefined,
    Icon: React.ElementType,
    color: string
  ) => {
    if (!items || items.length === 0) {
      return <p className="text-gray-500">No data available.</p>;
    }

    return (
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2"
          >
            <Icon
              size={18}
              className={`${color} mt-1 flex-shrink-0`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Upload Area */}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition ${
          isDragActive
            ? "border-blue-600 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
      >
        <input {...getInputProps()} />

        <UploadCloud
          className="mx-auto text-blue-600"
          size={70}
        />

        <h2 className="mt-6 text-2xl font-bold">
          Drag & Drop Your Resume
        </h2>

        <p className="mt-2 text-gray-500">
          PDF or DOCX (Maximum 5MB)
        </p>

        <Button className="mt-8">
          Browse Files
        </Button>
      </div>

      {/* Selected File */}

      {file && (
        <>
          <div className="mt-8 rounded-xl bg-white p-5 shadow-md flex items-center justify-between">

            <div className="flex items-center gap-3">

              <FileText
                className="text-blue-600"
                size={28}
              />

              <div>
                <p className="font-semibold">
                  📄 {file.name}

                </p>

                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>

                <p className="text-sm text-green-600">
                  ✓ Ready to Analyse
                </p>
              </div>

            </div>

            <Button
              disabled={loading}
              onClick={handleAnalyseResume}
            >
              {loading ? (
                <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Analysing...
                </>
              ) : (
                "Analyse Resume"
              )}
            </Button>

          </div>

          {/* Job Description */}

          <div className="mt-8">

            <label className="mb-3 block text-lg font-semibold">
              Job Description (Optional)
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              rows={10}
              placeholder="Paste the complete job description here..."
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
        </>
      )}

      {/* Results */}

      {analysis && (

        <div className="mt-10 rounded-2xl border bg-white p-8 shadow-xl">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-3xl font-bold">
              ATS Analysis Report
            </h2>

            <Button>

              <Download
                className="mr-2 h-4 w-4"
              />

              Download PDF

            </Button>

          </div>

          {/* AI Summary */}

          {analysis.summary && (

            <div className="mb-8 rounded-xl bg-slate-100 p-6">

              <h3 className="mb-2 text-xl font-bold">
                🤖 AI Summary
              </h3>

              <p className="leading-7 text-gray-700">
                {analysis.summary}
              </p>

            </div>

          )}

          {/* Scores */}

          <div className="mb-10 grid gap-8 md:grid-cols-2">

            <ScoreGauge
              score={analysis.atsScore}
              title="ATS Score"
            />

            {analysis.jobMatch !== undefined && (

              <ScoreGauge
                score={analysis.jobMatch}
                title="Job Match"
              />

            )}

          </div>

          {/* Analysis Cards */}

          <div className="grid gap-6 md:grid-cols-2">

            {/* Strengths */}

            <div className="rounded-xl border bg-green-50 p-5">

              <h3 className="mb-4 text-lg font-bold text-green-700">
                Strengths
              </h3>

              {renderList(
                analysis.strengths,
                CheckCircle,
                "text-green-600"
              )}

            </div>

            {/* Weaknesses */}

            <div className="rounded-xl border bg-red-50 p-5">

              <h3 className="mb-4 text-lg font-bold text-red-700">
                Weaknesses
              </h3>

              {renderList(
                analysis.weaknesses,
                XCircle,
                "text-red-600"
              )}

            </div>

            {/* Matching Skills */}

            {analysis.matchingSkills && (

              <div className="rounded-xl border bg-emerald-50 p-5">

                <h3 className="mb-4 text-lg font-bold text-emerald-700">
                  Matching Skills
                </h3>

                {renderList(
                  analysis.matchingSkills,
                  Target,
                  "text-emerald-600"
                )}

              </div>

            )}

            {/* Missing Skills */}

            {analysis.missingSkills && (

              <div className="rounded-xl border bg-orange-50 p-5">

                <h3 className="mb-4 text-lg font-bold text-orange-700">
                  Missing Skills
                </h3>

                {renderList(
                  analysis.missingSkills,
                  AlertTriangle,
                  "text-orange-600"
                )}

              </div>

            )}

            {/* Missing Keywords */}

            <div className="rounded-xl border bg-purple-50 p-5">

              <h3 className="mb-4 text-lg font-bold text-purple-700">
                Missing Keywords
              </h3>

              {renderList(
                analysis.missingKeywords,
                KeyRound,
                "text-purple-600"
              )}

            </div>

            {/* Suggestions */}

            <div className="rounded-xl border bg-blue-50 p-5">

              <h3 className="mb-4 text-lg font-bold text-blue-700">
                Suggestions
              </h3>

              {renderList(
                analysis.suggestions,
                Lightbulb,
                "text-blue-600"
              )}

            </div>

          </div>

        </div>

      )}

    </div>

  );
}