import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  const body = await req.json();

  const resume = await prisma.resumeAnalysis.update({
    where: {
      id,
    },
    data: body,
  });

  return NextResponse.json(resume);
}