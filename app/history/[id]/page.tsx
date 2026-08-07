import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import DownloadReportButton from "@/components/history/DownloadReportButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResumeDetailsPage({ params }: Props) {
  const { id } = await params;

  const resume = await prisma.resumeAnalysis.findUnique({
    where: {
      id,
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Header */}
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <h1 className="mb-6 text-4xl font-bold">
          Resume Details
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-5">
            <p className="text-sm text-slate-500">
              Resume
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              {resume.fileName}
            </h2>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-slate-500">
              ATS Score
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {resume.atsScore}%
            </h2>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-slate-500">
              Job Match
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {resume.jobMatch ?? "N/A"}
            </h2>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-slate-500">
              Date
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              {new Date(resume.createdAt).toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <h2 className="mb-4 text-2xl font-bold">
          AI Summary
        </h2>

        <p className="whitespace-pre-wrap leading-8 text-slate-700 dark:text-slate-300">
          {resume.summary}
        </p>
      </div>

      {/* Improved Resume */}
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <h2 className="mb-4 text-2xl font-bold">
          Improved Resume
        </h2>

        <pre className="whitespace-pre-wrap font-sans leading-7">
          {resume.improvedResume ||
            "No improved resume generated."}
        </pre>

        <div className="mt-6">
          <Link
            href={`/history/${resume.id}/compare`}
            className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Compare Resume
          </Link>
        </div>
      </div>

      {/* Cover Letter */}
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <h2 className="mb-4 text-2xl font-bold">
          Cover Letter
        </h2>

        <pre className="whitespace-pre-wrap font-sans leading-7">
          {resume.coverLetter ||
            "No cover letter generated."}
        </pre>
      </div>
    </main>
  );
}