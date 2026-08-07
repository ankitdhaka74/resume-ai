import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const history = await prisma.resumeAnalysis.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      fileName: true,
      atsScore: true,
      jobMatch: true,
      createdAt: true,
    },
  });

  return NextResponse.json(history);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("History Body:", body);

    const resume = await prisma.resumeAnalysis.create({
      data: {
        fileName: body.fileName,
        originalResume: body.originalResume,
        atsScore: body.atsScore,
        jobMatch: body.jobMatch,
        summary: body.summary,
        improvedResume: body.improvedResume,
        coverLetter: body.coverLetter,
      },
    });

    console.log("Saved Resume:", resume);

    return NextResponse.json(resume);
  } catch (error) {
    console.error("History POST Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}