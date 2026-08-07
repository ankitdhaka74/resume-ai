"use client";

export default function DownloadReportButton() {
  return (
    <button
      className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
      onClick={() => alert("Working")}
    >
      📥 Download ATS Report
    </button>
  );
}