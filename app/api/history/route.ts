import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
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
  } catch (error: any) {
    console.error("GET HISTORY ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    return NextResponse.json(resume);
  } catch (error: any) {
    console.error("POST HISTORY ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}