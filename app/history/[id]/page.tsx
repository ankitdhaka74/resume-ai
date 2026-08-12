import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import DownloadReportButton from "@/components/history/DownloadReportButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResumeDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  // Get logged-in session
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Find logged-in user
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Find resume ONLY if it belongs to this user
  const resume = await prisma.resumeAnalysis.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Resume Details
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Detailed analysis of your resume.
              </p>
            </div>

            <Link
              href="/history"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              ← Back to History
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Resume */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Resume
              </p>

              <h2 className="mt-2 break-all text-xl font-semibold text-slate-900">
                {resume.fileName}
              </h2>
            </div>

            {/* ATS */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                ATS Score
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {resume.atsScore}%
              </h2>
            </div>

            {/* Job Match */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Job Match
              </p>

              <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                {resume.jobMatch !== null
                  ? `${resume.jobMatch}%`
                  : "N/A"}
              </h2>
            </div>

            {/* Date */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Date
              </p>

              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                {new Date(
                  resume.createdAt
                ).toLocaleString()}
              </h2>
            </div>

          </div>
        </div>

        {/* AI Summary */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            AI Summary
          </h2>

          <p className="whitespace-pre-wrap leading-8 text-slate-700">
            {resume.summary}
          </p>

          <div className="mt-6">
            <DownloadReportButton
              fileName={resume.fileName}
              atsScore={resume.atsScore}
              jobMatch={resume.jobMatch}
              summary={resume.summary}
            />
          </div>
        </div>

        {/* Improved Resume */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Improved Resume
          </h2>

          <pre className="whitespace-pre-wrap font-sans leading-7 text-slate-700">
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
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Cover Letter
          </h2>

          <pre className="whitespace-pre-wrap font-sans leading-7 text-slate-700">
            {resume.coverLetter ||
              "No cover letter generated."}
          </pre>
        </div>

      </div>
    </main>
  );
}