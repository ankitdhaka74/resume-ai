import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// ==========================================
// GET ONE RESUME
// ==========================================
export async function GET(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

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

    const resume = await prisma.resumeAnalysis.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume analysis not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error("History GET [id] Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

// ==========================================
// UPDATE ONE RESUME
// ==========================================
export async function PATCH(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

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

    // Make sure this resume belongs to the logged-in user
    const existingResume =
      await prisma.resumeAnalysis.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });

    if (!existingResume) {
      return NextResponse.json(
        { error: "Resume analysis not found." },
        { status: 404 }
      );
    }

    const body = await req.json();

    // Only allow fields that should actually be updated
    const data: {
      improvedResume?: string;
      coverLetter?: string;
    } = {};

    if (typeof body.improvedResume === "string") {
      data.improvedResume = body.improvedResume;
    }

    if (typeof body.coverLetter === "string") {
      data.coverLetter = body.coverLetter;
    }

    const resume = await prisma.resumeAnalysis.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error("History PATCH [id] Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

// ==========================================
// DELETE ONE RESUME
// ==========================================
export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

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

    // Only delete if the resume belongs to this user
    const existingResume =
      await prisma.resumeAnalysis.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });

    if (!existingResume) {
      return NextResponse.json(
        { error: "Resume analysis not found." },
        { status: 404 }
      );
    }

    await prisma.resumeAnalysis.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Resume analysis deleted successfully.",
    });
  } catch (error) {
    console.error("History DELETE [id] Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}