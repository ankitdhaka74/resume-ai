import OpenAI from "openai";
import { NextResponse } from "next/server";
import { extractResumeText } from "@/lib/resumeParser";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("resume") as File | null;
    const jobDescription =
      formData.get("jobDescription")?.toString().trim() || "";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No resume uploaded." },
        { status: 400 }
      );
    }

    const resumeText = await extractResumeText(file);

    const prompt = `
You are an expert technical interviewer.

Based on this resume ${
      jobDescription ? "and job description" : ""
    }, generate interview preparation.

Resume:
${resumeText}

${jobDescription ? `Job Description:\n${jobDescription}` : ""}

Return ONLY valid JSON in this format:

{
  "hrQuestions": [
    {
      "question": "",
      "answer": ""
    }
  ],
  "technicalQuestions": [
    {
      "question": "",
      "answer": ""
    }
  ],
  "resumeQuestions": [
    {
      "question": "",
      "answer": ""
    }
  ]
}

Generate 5 HR questions,
5 Technical questions,
5 Resume-based questions.

Answers should be professional and concise.
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "Return ONLY valid JSON. No markdown. No explanations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const response =
      completion.choices[0]?.message?.content ?? "{}";

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json({
      success: true,
      interview: parsed,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate interview questions.",
      },
      { status: 500 }
    );
  }
}