"use client";

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescription({
  value,
  onChange,
}: JobDescriptionProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
        Job Description
      </h2>

      <p className="mb-4 text-sm text-slate-500">
        Paste the job description to improve ATS matching, cover letter, and interview questions.
      </p>

      <textarea
        rows={10}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the complete job description here..."
        className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
  );
}