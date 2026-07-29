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

    // Extract text from resume
    const resumeText = await extractResumeText(file);

    console.log("Resume length:", resumeText.length);
    console.log("Resume preview:");
    console.log(resumeText.slice(0, 500));

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not extract any text from the resume.",
        },
        { status: 400 }
      );
    }

    // Prevent token overflow
    const trimmedResume = resumeText.substring(0, 12000);

    // Build prompt based on whether JD exists
    const prompt = jobDescription
      ? `
You are a professional ATS Resume Analyzer.

Compare the following resume with the given job description.

Resume:
${trimmedResume}

Job Description:
${jobDescription}

Return ONLY valid JSON in this exact format:

{
  "summary": "",
  "atsScore": 0,
  "jobMatch": 0,
  "strengths": [],
  "weaknesses": [],
  "matchingSkills": [],
  "missingSkills": [],
  "missingKeywords": [],
  "suggestions": []
}

Rules:
- summary should be 2-3 professional sentences describing how well the resume matches the job and the biggest improvements.
- atsScore must be between 0 and 100.
- jobMatch must be between 0 and 100.
- matchingSkills should include skills present in both resume and the job description.
- missingSkills should include important skills required by the job but missing from the resume.
- missingKeywords should contain ATS keywords absent from the resume.
- suggestions should provide specific, actionable improvements.
- Return ONLY valid JSON.
`
      : `
You are a professional ATS Resume Analyzer.

Analyse the following resume.

Resume:
${trimmedResume}

Return ONLY valid JSON in this exact format:

{
  "summary": "",
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "suggestions": []
}

Rules:
- summary should briefly describe the overall quality of the resume in 2-3 sentences.
- atsScore must be between 0 and 100.
- Base the score only on the resume content.
- Do not invent information.
- suggestions should contain practical improvements.
- Return ONLY valid JSON.
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are an ATS Resume Analyzer. Respond ONLY with valid JSON. Never use markdown, code fences, explanations, or extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiResponse =
      completion.choices[0]?.message?.content?.trim() ?? "{}";

    console.log("========== RAW AI RESPONSE ==========");
    console.log(aiResponse);
    console.log("=====================================");

    // Remove markdown if model returns it
    const cleanedResponse = aiResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanedResponse);
      parsed.summary ??= "No summary generated.";
      parsed.atsScore ??= 0;
      parsed.strengths ??= [];
      parsed.weaknesses ??= [];
      parsed.missingKeywords ??= [];
      parsed.suggestions ??= [];

      if (jobDescription) {
        parsed.jobMatch ??= 0;
        parsed.matchingSkills ??= [];
        parsed.missingSkills ??= [];
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "AI returned invalid JSON.",
          raw: cleanedResponse,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      ai: parsed,
      extractedCharacters: resumeText.length,
    });
  } catch (error: unknown) {
    console.error("Groq Error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown Error";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}