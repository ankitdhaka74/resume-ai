import jsPDF from "jspdf";

const PROJECT_TITLE = "AI Resume Analyzer";

const MARGIN = 56; // ~0.78in in pt, gives comfortable margins on A4
const PAGE_WIDTH = 595.28; // A4 width in pt
const PAGE_HEIGHT = 841.89; // A4 height in pt
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const COLORS = {
  heading: "#111827", // slate-900
  subheading: "#1d4ed8", // blue-700
  body: "#374151", // gray-700
  muted: "#6b7280", // gray-500
  rule: "#e5e7eb", // gray-200
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Shared document scaffold: creates the jsPDF instance, draws the masthead
 * (project title, section title, generated date, divider) and returns the
 * instance plus the current y cursor so callers can start writing body content.
 */
function createDocument(sectionTitle: string) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  let y = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(COLORS.muted);
  doc.text(PROJECT_TITLE.toUpperCase(), MARGIN, y);
  y += 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(COLORS.heading);
  doc.text(sectionTitle, MARGIN, y);
  y += 18;

  doc.setDrawColor(COLORS.rule);
  doc.setLineWidth(1);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(COLORS.muted);
  doc.text(`Generated on: ${formatDate(new Date())}`, MARGIN, y);
  y += 28;

  return { doc, y };
}

/** Adds a new page and resets the y cursor if the next block won't fit. */
function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_HEIGHT - MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

/**
 * Heuristic heading detector for free-form resume/cover-letter text:
 * short lines (no trailing punctuation) are treated as section headings,
 * everything else is wrapped as body paragraph text.
 */
function isLikelyHeading(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.length > 60) return false;
  if (/[.,;:]$/.test(trimmed)) return false;
  // Headings are usually short phrases without a verb-heavy sentence structure.
  const wordCount = trimmed.split(/\s+/).length;
  return wordCount <= 6;
}

/** Writes free-form text (resume / cover letter) with heading detection and page breaks. */
function writeBodyText(doc: jsPDF, startY: number, content: string): void {
  let y = startY;
  const lines = content.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.trim() === "") {
      y += 10;
      continue;
    }

    if (isLikelyHeading(line)) {
      y = ensureSpace(doc, y, 30);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(COLORS.subheading);
      doc.text(line.trim(), MARGIN, y);
      y += 18;
      continue;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(COLORS.body);

    const wrapped = doc.splitTextToSize(line, CONTENT_WIDTH) as string[];
    for (const wrappedLine of wrapped) {
      y = ensureSpace(doc, y, 16);
      doc.text(wrappedLine, MARGIN, y);
      y += 15;
    }
  }
}

export function downloadResumePdf(
  improvedResume: string,
  fileName = "improved-resume.pdf"
): void {
  const { doc, y } = createDocument("Improved Resume");
  writeBodyText(doc, y, improvedResume);
  doc.save(fileName);
}

export function downloadCoverLetterPdf(
  coverLetter: string,
  fileName = "cover-letter.pdf"
): void {
  const { doc, y } = createDocument("Cover Letter");
  writeBodyText(doc, y, coverLetter);
  doc.save(fileName);
}

export interface InterviewQA {
  question: string;
  answer: string;
}

export interface InterviewPrepData {
  hrQuestions?: InterviewQA[];
  technicalQuestions?: InterviewQA[];
  resumeQuestions?: InterviewQA[];
}

export function downloadInterviewPdf(
  interview: InterviewPrepData,
  fileName = "interview-preparation.pdf"
): void {
  const { doc, y: startY } = createDocument("Interview Preparation");
  let y = startY;

  const sections: { title: string; data?: InterviewQA[] }[] = [
    { title: "HR Questions", data: interview.hrQuestions },
    { title: "Technical Questions", data: interview.technicalQuestions },
    { title: "Resume Questions", data: interview.resumeQuestions },
  ];

  for (const section of sections) {
    if (!section.data || section.data.length === 0) continue;

    y = ensureSpace(doc, y, 34);
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(COLORS.subheading);
    doc.text(section.title, MARGIN, y);
    y += 10;
    doc.setDrawColor(COLORS.rule);
    doc.setLineWidth(0.75);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 18;

    section.data.forEach((item, index) => {
      y = ensureSpace(doc, y, 30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(COLORS.heading);
      const qLines = doc.splitTextToSize(
        `Q${index + 1}. ${item.question}`,
        CONTENT_WIDTH
      ) as string[];
      for (const line of qLines) {
        y = ensureSpace(doc, y, 16);
        doc.text(line, MARGIN, y);
        y += 15;
      }

      y += 2;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(COLORS.muted);
      y = ensureSpace(doc, y, 14);
      doc.text("Suggested Answer:", MARGIN, y);
      y += 14;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(COLORS.body);
      const aLines = doc.splitTextToSize(item.answer, CONTENT_WIDTH) as string[];
      for (const line of aLines) {
        y = ensureSpace(doc, y, 15);
        doc.text(line, MARGIN, y);
        y += 14;
      }

      y += 14;
    });
  }

  doc.save(fileName);
}
