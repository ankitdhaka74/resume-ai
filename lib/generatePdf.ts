import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Analysis } from "@/types/analysis";

export function generateResumePdf(
  fileName: string,
  analysis: Analysis
) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.text("AI Resume Analysis Report", 14, 20);

  // Resume info
  doc.setFontSize(12);
  doc.text(`Resume: ${fileName}`, 14, 32);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 40);

  // Scores
  autoTable(doc, {
    startY: 48,
    head: [["Metric", "Value"]],
    body: [
      ["ATS Score", `${analysis.atsScore}%`],
      ["Job Match", `${analysis.jobMatch ?? 0}%`],
    ],
  });

  let y = (doc as any).lastAutoTable.finalY + 12;

  const addSection = (title: string, items: string[]) => {
    doc.setFontSize(15);
    doc.text(title, 14, y);
    y += 8;

    doc.setFontSize(11);

    if (items.length === 0) {
      doc.text("- None", 18, y);
      y += 8;
      return;
    }

    items.forEach((item) => {
      doc.text(`• ${item}`, 18, y);
      y += 7;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    y += 4;
  };

  // Summary
  doc.setFontSize(15);
  doc.text("Summary", 14, y);
  y += 8;

  doc.setFontSize(11);
  doc.text(
    analysis.summary || "No summary available.",
    14,
    y,
    { maxWidth: 180 }
  );

  y += 22;

  addSection("Strengths", analysis.strengths);
  addSection("Weaknesses", analysis.weaknesses);
  addSection("Matching Skills", analysis.matchingSkills ?? []);
  addSection("Missing Skills", analysis.missingSkills ?? []);
  addSection("Missing Keywords", analysis.missingKeywords);
  addSection("Suggestions", analysis.suggestions);

  doc.save("Resume-Analysis-Report.pdf");
}