"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescription({
  value,
  onChange,
}: Props) {
  return (
    <div className="mt-8">
      <label className="block text-lg font-semibold mb-3">
        Paste Job Description
      </label>

      <textarea
        rows={10}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}