import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/lib/prisma";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest) {
  try {
    // Receive message from frontend
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        {
          reply: "Please enter a message.",
        },
        {
          status: 400,
        }
      );
    }

    // Get latest analyzed resume
    const latestResume = await prisma.resumeAnalysis.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestResume) {
      return NextResponse.json({
        reply: "Please analyze a resume first.",
      });
    }

    const prompt = `
You are an expert Resume Coach.

Resume:
${latestResume.originalResume ?? ""}

AI Summary:
${latestResume.summary}

Improved Resume:
${latestResume.improvedResume ?? ""}

Cover Letter:
${latestResume.coverLetter ?? ""}

User Question:
${message}

Answer naturally and professionally.
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a professional Resume Coach. Answer ONLY based on the provided resume. If information is missing, clearly say so instead of making it up.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      reply:
        completion.choices[0]?.message?.content ??
        "Sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error("Resume Chat Error:", error);

    return NextResponse.json(
      {
        reply: "Something went wrong while generating the response.",
      },
      {
        status: 500,
      }
    );
  }
}