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
        {
          success: false,
          error: "No resume uploaded.",
        },
        { status: 400 }
      );
    }

    if (!jobDescription) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a job description.",
        },
        { status: 400 }
      );
    }

    const resumeText = await extractResumeText(file);

    const prompt = `
You are an expert career coach.

Using the resume and the job description below, write a professional cover letter.

Rules:

- Keep it around 300–400 words.
- Address it as "Dear Hiring Manager".
- Highlight relevant skills from the resume.
- Match the job description.
- Do not invent experience.
- Sound confident and professional.
- End with a strong closing.
- Return ONLY the cover letter.

Resume:

${resumeText}

Job Description:

${jobDescription}
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are a professional cover letter writer. Return only the cover letter.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const coverLetter =
      completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({
      success: true,
      coverLetter,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate cover letter.",
      },
      { status: 500 }
    );
  }
}