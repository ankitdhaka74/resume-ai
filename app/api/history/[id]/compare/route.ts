import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const resume = await prisma.resumeAnalysis.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(resume);
}