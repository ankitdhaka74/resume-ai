"use client";

interface DownloadReportButtonProps {
  fileName: string;
  atsScore: number;
  jobMatch: number | null;
  summary: string;
}

export default function DownloadReportButton({
  fileName,
  atsScore,
  jobMatch,
  summary,
}: DownloadReportButtonProps) {
  const handleDownload = () => {
    const report = `
AI RESUME ANALYSIS REPORT
=========================

Resume: ${fileName}

ATS Score: ${atsScore}%

Job Match: ${jobMatch ?? "N/A"}%

Summary:
${summary}
`;

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName.replace(/\.[^/.]+$/, "")}-report.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      Download Report
    </button>
  );
}