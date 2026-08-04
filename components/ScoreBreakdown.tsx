"use client";

interface ScoreBreakdownProps {
  breakdown: {
    content: number;
    skills: number;
    formatting: number;
    experience: number;
    education: number;
  };
}

export default function ScoreBreakdown({
  breakdown,
}: ScoreBreakdownProps) {
  const scores = [
    { label: "Content", value: breakdown.content },
    { label: "Skills", value: breakdown.skills },
    { label: "Formatting", value: breakdown.formatting },
    { label: "Experience", value: breakdown.experience },
    { label: "Education", value: breakdown.education },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        📊 Score Breakdown
      </h2>

      <div className="space-y-5">
        {scores.map((score) => (
          <div key={score.label}>
            <div className="mb-1 flex justify-between">
              <span className="font-medium">
                {score.label}
              </span>

              <span className="font-semibold text-blue-600">
                {score.value}%
              </span>
            </div>

            <div className="h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-blue-600"
                style={{ width: `${score.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}