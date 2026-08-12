import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const resumes = await prisma.resumeAnalysis.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const total = resumes.length;

    const averageATS =
      total === 0
        ? 0
        : Math.round(
            resumes.reduce(
              (sum, item) => sum + item.atsScore,
              0
            ) / total
          );

    const bestATS =
      total === 0
        ? 0
        : Math.max(
            ...resumes.map((item) => item.atsScore)
          );

    const latestResume = resumes.at(-1) ?? null;

    const chart = resumes.map((resume) => ({
      date: new Date(
        resume.createdAt
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      ats: resume.atsScore,
    }));

    const monthlyMap = new Map<string, number>();

    resumes.forEach((resume) => {
      const month = new Date(
        resume.createdAt
      ).toLocaleDateString("en-US", {
        month: "short",
      });

      monthlyMap.set(
        month,
        (monthlyMap.get(month) || 0) + 1
      );
    });

    const monthly = Array.from(
      monthlyMap.entries()
    ).map(([month, count]) => ({
      month,
      count,
    }));

    return NextResponse.json({
      total,
      averageATS,
      bestATS,
      latestResume,
      chart,
      monthly,
    });
  } catch (error) {
    console.error("DASHBOARD API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}