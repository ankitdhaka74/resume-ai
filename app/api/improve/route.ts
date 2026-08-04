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

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No resume uploaded.",
        },
        { status: 400 }
      );
    }

    const resumeText = await extractResumeText(file);

    if (!resumeText.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to extract resume text.",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert ATS Resume Writer.

Rewrite the following resume professionally.

Requirements:

- Improve grammar.
- Improve formatting.
- Rewrite weak bullet points.
- Make every sentence ATS-friendly.
- Keep all factual information.
- Do NOT invent projects, companies or experience.
- Return only the rewritten resume as plain text.
- Do not use markdown.
- Use headings like:
Professional Summary
Skills
Experience
Projects
Education

Resume:

${resumeText}
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer. Return only the improved resume.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const improvedResume =
      completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({
      success: true,
      improvedResume,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to improve resume.",
      },
      { status: 500 }
    );
  }
}