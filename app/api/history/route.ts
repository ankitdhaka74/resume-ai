import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// ===============================
// GET USER'S HISTORY
// ===============================
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find the logged-in user
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

    // Only return this user's resumes
    const history = await prisma.resumeAnalysis.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        fileName: true,
        atsScore: true,
        jobMatch: true,
        summary: true,
        createdAt: true,
      },
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("History GET Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      { status: 500 }
    );
  }
}

// ===============================
// CREATE USER'S HISTORY
// ===============================
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find logged-in user
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

    const body = await req.json();

    console.log("History Body:", body);
    console.log("Saving history for user:", user.id);

    // Create resume and attach it to logged-in user
    const resume = await prisma.resumeAnalysis.create({
      data: {
        fileName: body.fileName,
        originalResume: body.originalResume,
        atsScore: body.atsScore,
        jobMatch: body.jobMatch ?? null,
        summary: body.summary,
        improvedResume: body.improvedResume ?? "",
        coverLetter: body.coverLetter ?? "",

        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    console.log("Saved Resume:", resume.id);
    console.log("Saved for User:", user.id);

    return NextResponse.json(resume);
  } catch (error) {
    console.error("History POST Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      { status: 500 }
    );
  }
}