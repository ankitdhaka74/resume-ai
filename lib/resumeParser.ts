import { PdfReader } from "pdfreader";
import mammoth from "mammoth";

export async function extractResumeText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "application/pdf") {
    return new Promise((resolve, reject) => {
      let text = "";

      new PdfReader().parseBuffer(buffer, (err, item) => {
        if (err) return reject(err);

        if (!item) {
          resolve(text);
          return;
        }

        if (item.text) {
          text += item.text + "\n";
        }
      });
    });
  }

  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file");
}