import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const resumes = await prisma.resumeAnalysis.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const total = resumes.length;

  const averageATS =
    total === 0
      ? 0
      : Math.round(
          resumes.reduce((sum, item) => sum + item.atsScore, 0) / total
        );

  const bestATS =
    total === 0
      ? 0
      : Math.max(...resumes.map((item) => item.atsScore));

  const latestResume = resumes.at(-1) ?? null;

  const chart = resumes.map((resume) => ({
    date: new Date(resume.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    ats: resume.atsScore,
  }));

  // Monthly Analytics
  const monthlyMap = new Map<string, number>();

  resumes.forEach((resume) => {
    const month = new Date(resume.createdAt).toLocaleDateString("en-US", {
      month: "short",
    });

    monthlyMap.set(month, (monthlyMap.get(month) || 0) + 1);
  });

  const monthly = Array.from(monthlyMap.entries()).map(
    ([month, count]) => ({
      month,
      count,
    })
  );

  return NextResponse.json({
    total,
    averageATS,
    bestATS,
    latestResume,
    chart,
    monthly,
  });
}