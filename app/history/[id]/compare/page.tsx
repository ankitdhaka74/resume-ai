import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ComparePage({
  params,
}: Props) {
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
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Resume Comparison
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Original Resume */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">
            Original Resume
          </h2>

          <pre className="whitespace-pre-wrap font-sans text-sm leading-7">
            {resume.originalResume ||
              "Original resume not available."}
          </pre>
        </div>

        {/* AI Improved Resume */}

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-green-600">
            AI Improved Resume
          </h2>

          <pre className="whitespace-pre-wrap font-sans text-sm leading-7">
            {resume.improvedResume ||
              "No improved resume generated."}
          </pre>
        </div>

      </div>
    </main>
  );
}